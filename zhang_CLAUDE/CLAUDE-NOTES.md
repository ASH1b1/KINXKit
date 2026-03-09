# CLAUDE 指南要点与补充

> 主文档： [d:/KINXKit/CLAUDE.md](file:///d:/KINXKit/CLAUDE.md)

## 核心原则
- 先文档后代码：文档通过后才能编码，测试优先于实现
- 用户友好与跨平台：Windows/macOS/Linux 一致体验
- 错误可行动：报错需给出解决建议
- 安全与隐私：不泄露密钥与凭据

## 流程规范
1. docs/plans 中撰写实现计划（目标/接口/策略/测试/验收）
2. 先编写失败测试，再写最小实现使其通过
3. 扩充分支与异常测试，达到覆盖率要求
4. 记录进度到本目录 progress.md

## 当前重点（示例）
- 代理检测器（ProxyDetector）
  - 优先级：环境变量 → 系统代理 → 软件迹象 → 常用端口
  - 安全：不打印凭据，仅记录 type/host/port
  - 测试：平台分支与端口可达性均需覆盖
  - 已实现要点：macOS/Linux 系统代理读取、软件迹象端口校验、常用端口快速探测、200ms 超时

## 参考链接
- 计划索引：[docs/2026.03.09-ZHANGplans/README.md](file:///d:/KINXKit/docs/2026.03.09-ZHANGplans/README.md)
- 代理检测计划：[docs/2026.03.09-ZHANGplans/2026-03-09-proxy-detector.md](file:///d:/KINXKit/docs/2026.03.09-ZHANGplans/2026-03-09-proxy-detector.md)
