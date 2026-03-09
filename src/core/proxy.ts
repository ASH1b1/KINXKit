import { execaCommand } from 'execa';
import os from 'node:os';
import net from 'node:net';
import { logger } from '../utils/logger.js';
import { ProxyInfo } from '../types.js';

function stripAuth(u: URL): URL {
  if (u.username || u.password) {
    return new URL(`${u.protocol}//${u.hostname}${u.port ? `:${u.port}` : ''}`);
  }
  return u;
}

function parseProxyUrl(raw: string): { type: 'http' | 'socks5'; host: string; port: number } | null {
  if (!raw) return null;
  const v = raw.trim();

  if (v.toLowerCase().startsWith('socks5://')) {
    const afterScheme = v.slice('socks5://'.length);
    const withoutCred = afterScheme.includes('@') ? afterScheme.split('@').pop()! : afterScheme;
    const [host, portStr] = withoutCred.split(':');
    const port = portStr ? parseInt(portStr, 10) : 1080;
    if (!host || Number.isNaN(port)) return null;
    return { type: 'socks5', host, port };
  }

  if (v.toLowerCase().startsWith('http://') || v.toLowerCase().startsWith('https://')) {
    try {
      const u = new URL(v);
      const cleaned = stripAuth(u);
      const host = cleaned.hostname;
      const port = cleaned.port ? parseInt(cleaned.port, 10) : 8080;
      if (!host || Number.isNaN(port)) return null;
      return { type: 'http', host, port };
    } catch {
      return null;
    }
  }

  if (/^[a-z]+:\/\//i.test(v)) {
    try {
      const u = new URL(v);
      const cleaned = stripAuth(u);
      const proto = cleaned.protocol.replace(':', '').toLowerCase();
      const type = proto.includes('socks') ? 'socks5' : 'http';
      const host = cleaned.hostname;
      const port = cleaned.port ? parseInt(cleaned.port, 10) : type === 'http' ? 8080 : 1080;
      if (!host || Number.isNaN(port)) return null;
      return { type, host, port };
    } catch {
    }
  }

  const [host, portStr] = v.split(':');
  const port = portStr ? parseInt(portStr, 10) : 8080;
  if (!host || Number.isNaN(port)) return null;
  return { type: 'http', host, port };
}

export class ProxyDetector {
  private cache?: ProxyInfo | null;

  async detect(): Promise<ProxyInfo | null> {
    if (this.cache !== undefined) return this.cache;

    const envInfo = this.checkEnvVars();
    if (envInfo) {
      logger.info('检测到代理（环境变量）', { type: envInfo.type, host: envInfo.host, port: envInfo.port });
      return (this.cache = envInfo);
    }

    const sys = await this.checkSystemProxy();
    if (sys) {
      logger.info('检测到代理（系统）', { type: sys.type, host: sys.host, port: sys.port });
      return (this.cache = sys);
    }

    const sw = await this.checkSoftware();
    if (sw) {
      logger.info('检测到代理（软件）', { type: sw.type, host: sw.host, port: sw.port });
      return (this.cache = sw);
    }

    const manual = await this.checkCommonPorts();
    if (manual) {
      logger.info('检测到代理（端口）', { type: manual.type, host: manual.host, port: manual.port });
      return (this.cache = manual);
    }

    return (this.cache = null);
  }

  private checkEnvVars(): ProxyInfo | null {
    const candidates = [
      process.env.HTTP_PROXY,
      process.env.http_proxy,
      process.env.HTTPS_PROXY,
      process.env.https_proxy,
      process.env.ALL_PROXY,
      process.env.all_proxy
    ].filter(Boolean) as string[];

    for (const raw of candidates) {
      const parsed = parseProxyUrl(raw);
      if (parsed) {
        const info: ProxyInfo = {
          enabled: true,
          type: parsed.type,
          host: parsed.host,
          port: parsed.port,
          source: 'env'
        };
        return info;
      }
    }
    return null;
  }

  private async checkSystemProxy(): Promise<ProxyInfo | null> {
    const platform = os.platform();
    if (platform === 'win32') {
      try {
        const { stdout } = await execaCommand('netsh winhttp show proxy');
        if (!stdout || /Direct access/i.test(stdout)) return null;
        const line = stdout.split('\n').find((l) => l.toLowerCase().includes('proxy server'));
        if (!line) return null;
        const parts = line.split(':').slice(1).join(':'); // after colon
        const segments = parts.split(';').map((s) => s.trim());
        let choice: { type: 'http' | 'socks5'; host: string; port: number } | null = null;
        for (const seg of segments) {
          if (!seg) continue;
          if (seg.toLowerCase().startsWith('http=')) {
            const hp = seg.includes('=') ? seg.split('=')[1] : undefined;
            if (!hp) continue;
            const [host, portStr] = hp.split(':');
            const port = parseInt(portStr || '8080', 10);
            if (host && !Number.isNaN(port)) {
              choice = { type: 'http', host, port };
              break;
            }
          }
          if (seg.toLowerCase().startsWith('socks=')) {
            const hp = seg.includes('=') ? seg.split('=')[1] : undefined;
            if (!hp) continue;
            const [host, portStr] = hp.split(':');
            const port = parseInt(portStr || '1080', 10);
            if (host && !Number.isNaN(port)) {
              choice = { type: 'socks5', host, port };
              if (!choice) continue;
            }
          }
        }
        if (!choice) return null;
        const ok = await this.isPortOpen(choice.host, choice.port);
        if (!ok) return null;
        return {
          enabled: true,
          type: choice.type,
          host: choice.host,
          port: choice.port,
          source: 'software'
        };
      } catch {
        return null;
      }
    }
    if (platform === 'darwin') {
      try {
        const { stdout } = await execaCommand('networksetup -listallnetworkservices');
        const services = stdout
          .split('\n')
          .map((s) => s.trim())
          .filter((s) => s && !s.startsWith('An asterisk'));
        for (const svc of services) {
          try {
            const { stdout: httpOut } = await execaCommand(`networksetup -getwebproxy "${svc}"`);
            if (/Enabled:\s*Yes/i.test(httpOut)) {
              const host = (httpOut.match(/Server:\s*(.+)/i)?.[1] || '').trim();
              const portStr = (httpOut.match(/Port:\s*(\d+)/i)?.[1] || '').trim();
              const port = parseInt(portStr || '8080', 10);
              if (host && !Number.isNaN(port) && (await this.isPortOpen(host, port))) {
                return { enabled: true, type: 'http', host, port, source: 'software' };
              }
            }
          } catch {}
          try {
            const { stdout: socksOut } = await execaCommand(`networksetup -getsocksfirewallproxy "${svc}"`);
            if (/Enabled:\s*Yes/i.test(socksOut)) {
              const host = (socksOut.match(/Server:\s*(.+)/i)?.[1] || '').trim();
              const portStr = (socksOut.match(/Port:\s*(\d+)/i)?.[1] || '').trim();
              const port = parseInt(portStr || '1080', 10);
              if (host && !Number.isNaN(port) && (await this.isPortOpen(host, port))) {
                return { enabled: true, type: 'socks5', host, port, source: 'software' };
              }
            }
          } catch {}
        }
      } catch {
        return null;
      }
    }
    if (platform === 'linux') {
      try {
        const { stdout: modeOut } = await execaCommand('gsettings get org.gnome.system.proxy mode');
        if (!/manual/i.test(modeOut)) return null;
        try {
          const { stdout: hostOut } = await execaCommand('gsettings get org.gnome.system.proxy.http host');
          const { stdout: portOut } = await execaCommand('gsettings get org.gnome.system.proxy.http port');
          const host = hostOut.replace(/['\s]/g, '');
          const port = parseInt(portOut.replace(/[^0-9]/g, ''), 10);
          if (host && !Number.isNaN(port) && (await this.isPortOpen(host, port))) {
            return { enabled: true, type: 'http', host, port, source: 'software' };
          }
        } catch {}
        try {
          const { stdout: shostOut } = await execaCommand('gsettings get org.gnome.system.proxy.socks host');
          const { stdout: sportOut } = await execaCommand('gsettings get org.gnome.system.proxy.socks port');
          const host = shostOut.replace(/['\s]/g, '');
          const port = parseInt(sportOut.replace(/[^0-9]/g, ''), 10);
          if (host && !Number.isNaN(port) && (await this.isPortOpen(host, port))) {
            return { enabled: true, type: 'socks5', host, port, source: 'software' };
          }
        } catch {}
      } catch {
        return null;
      }
    }
    return null;
  }

  private async checkSoftware(): Promise<ProxyInfo | null> {
    const candidates: Array<{ software?: string; type: 'http' | 'socks5'; host: string; port: number }> = [
      { software: 'clash', type: 'http', host: '127.0.0.1', port: 7890 },
      { software: 'clash', type: 'socks5', host: '127.0.0.1', port: 1080 },
      { software: 'sing-box', type: 'http', host: '127.0.0.1', port: 7890 },
      { software: 'v2ray', type: 'socks5', host: '127.0.0.1', port: 1080 },
      { software: 'http', type: 'http', host: '127.0.0.1', port: 8889 }
    ];
    for (const c of candidates) {
      try {
        const ok = await this.isPortOpen(c.host, c.port);
        if (ok) {
          return {
            enabled: true,
            type: c.type,
            host: c.host,
            port: c.port,
            source: 'software',
            software: c.software
          } as ProxyInfo;
        }
      } catch {}
    }
    return null;
  }

  private async checkCommonPorts(): Promise<ProxyInfo | null> {
    const ports = [7890, 1080, 8889, 8080];
    for (const p of ports) {
      const ok = await this.isPortOpen('127.0.0.1', p);
      if (ok) {
        const type: 'http' | 'socks5' = p === 1080 ? 'socks5' : 'http';
        return {
          enabled: true,
          type,
          host: '127.0.0.1',
          port: p,
          source: 'manual'
        };
      }
    }
    return null;
  }

  private async isPortOpen(host: string, port: number): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      const socket = new net.Socket();
      const onError = () => {
        cleanup();
        resolve(false);
      };
      const onConnect = () => {
        cleanup();
        resolve(true);
      };
      const cleanup = () => {
        socket.removeAllListeners();
        try {
          socket.destroy();
        } catch {}
      };
      socket.setTimeout(200, onError);
      socket.once('error', onError);
      socket.once('timeout', onError);
      socket.connect(port, host, onConnect);
    });
  }
}
