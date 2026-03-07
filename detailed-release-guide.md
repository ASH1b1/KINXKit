# 📋 GitHub Release 创建详细指南

## 🎯 方法一：通过 GitHub 网页手动创建（推荐）

### 第 1 步：访问 GitHub Releases 页面

在浏览器中打开以下链接：
```
https://github.com/Cherny0306/KINXKit/releases/new
```

或者：
1. 访问 https://github.com/Cherny0306/KINXKit
2. 点击右侧的 **"Releases"** 链接
3. 点击 **"Draft a new release"** 按钮

---

### 第 2 步：填写 Release 信息

#### 📝 基本信息

**Choose a tag**: 点击输入框，选择或输入 `v0.2.0`
- ✅ 如果提示标签不存在，点击 **"Create new tag"**
- **Target**: 选择 `main` 分支
- ✅ 勾选 **"Set as the latest release"**

**Release title**: 复制粘贴以下内容
```
🎉 KINXKit v0.2.0 - Phase 2 核心功能完成
```

---

### 第 3 步：添加 Release 描述

#### 方法 A：直接复制粘贴（推荐）

1. 打开项目目录中的 `RELEASE_NOTES_v0.2.0.md` 文件
2. 全选并复制文件内容（Ctrl+A, Ctrl+C）
3. 在 GitHub Release 页面的描述框中粘贴（Ctrl+V）

#### 方法 B：使用简化版本

如果完整描述太长，可以使用以下简化版本：

```markdown
## 🎉 KINXKit v0.2.0 重大更新

### ✨ 新增项目模板系统

**Python 数据分析模板**
- 📊 DataLoader: CSV/Excel/JSON 加载
- 🔬 DataAnalyzer: 统计分析、相关性、异常值检测
- 📈 DataVisualizer: 10+ 种图表类型
- 📓 Jupyter Notebook 示例

**Node.js Web 应用模板**
- ⚡ Express.js + TypeScript
- 🛡️ 安全中间件（Helmet、CORS）
- 📝 结构化日志系统
- 🔧 模块化路由结构

### 🔗 GitHub 集成

- ✅ GitHub CLI 认证
- ✅ 仓库创建和推送
- ✅ 敏感文件自动检测

**新增命令**:
- `kinx github login/status/create`

### ⚙️ 配置管理

- ✅ API 密钥配置（5+ 主流服务）
- ✅ 数据库配置（4 种数据库）
- ✅ .env 文件自动生成

**新增命令**:
- `kinx config api/database/init`

### 🏥 环境诊断

- ✅ 全面环境检查
- ✅ 详细建议和修复方案

**新增命令**:
- `kinx doctor`

### 📊 统计数据

- 新增文件: 58 个
- 新增代码: 5,443 行
- Phase 2 进度: 65% → 85%

### 🚀 快速开始

```bash
# 安装
npm install

# 构建
npm run build

# 测试
kinx doctor

# 创建项目
kinx create my-project
```

### 📄 完整更新日志

查看 [CHANGELOG.md](https://github.com/Cherny0306/KINXKit/blob/main/CHANGELOG.md)

### 💬 反馈与支持

- **GitHub Issues**: https://github.com/Cherny0306/KINXKit/issues
- **文档**: https://github.com/Cherny0306/KINXKit/blob/main/README.md

---

**下载地址**: https://github.com/Cherny0306/KINXKit/archive/refs/tags/v0.2.0.zip
```

---

### 第 4 步：发布 Release

1. ✅ 确认所有信息填写正确
2. ✅ **Set as a prelease**: 不勾选
3. ✅ 点击绿色的 **"Publish release"** 按钮

---

### 第 5 步：验证 Release

发布成功后，你应该看到：

1. ✅ Release 页面显示：
   ```
   🎉 KINXKit v0.2.0 - Phase 2 核心功能完成
   Latest release
   ```

2. ✅ 可以访问：
   ```
   https://github.com/Cherny0306/KINXKit/releases/tag/v0.2.0
   ```

3. ✅ 右侧边栏显示此 Release 为 **"Latest release"**

---

## 🤖 方法二：使用自动化脚本

### Windows 系统

1. **获取 GitHub Token**
   - 访问：https://github.com/settings/tokens
   - 点击：**"Generate new token"** → **"Generate new token (classic)"**
   - 勾选权限：`repo`（完整的仓库访问权限）
   - 点击：**"Generate token"**
   - **重要**：复制并保存 token（只显示一次）

2. **运行脚本**
   ```cmd
   # 设置 Token（替换为你的实际 token）
   set GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxx

   # 运行创建脚本
   create-release.bat
   ```

3. **验证**
   - 访问：https://github.com/Cherny0306/KINXKit/releases
   - 确认 v0.2.0 Release 已创建

---

### Linux/Mac 系统

1. **获取 GitHub Token**（同上）

2. **运行脚本**
   ```bash
   # 设置 Token（替换为你的实际 token）
   export GITHUB_TOKEN='ghp_xxxxxxxxxxxxxxxxxxxx'

   # 给脚本添加执行权限
   chmod +x create-release.sh

   # 运行创建脚本
   ./create-release.sh
   ```

3. **验证**（同上）

---

## 🔧 方法三：使用 GitHub CLI（gh）

### 安装 GitHub CLI

**Windows**:
```powershell
winget install --id GitHub.cli
```

**macOS**:
```bash
brew install gh
```

**Linux**:
```bash
sudo apt install gh
```

### 认证
```bash
gh auth login
```

### 创建 Release
```bash
cd "C:\Users\A\.claude\KINXKit"
gh release create v0.2.0 \
  --title "🎉 KINXKit v0.2.0 - Phase 2 核心功能完成" \
  --notes-file RELEASE_NOTES_v0.2.0.md
```

---

## ✅ 验证清单

发布完成后，确认以下内容：

- [ ] Release 页面可访问：https://github.com/Cherny0306/KINXKit/releases/tag/v0.2.0
- [ ] 标题显示正确：🎉 KINXKit v0.2.0 - Phase 2 核心功能完成
- [ ] 标记为 "Latest release"
- [ ] 描述内容完整显示
- [ ] 所有链接可点击
- [ ] 代码块格式正确

---

## 🎯 发布后操作

Release 创建成功后，可以：

1. **通知用户**
   - 在社交媒体分享 Release 链接
   - 发送邮件通知订阅者
   - 在 README.md 中添加 "Latest Release" 徽章

2. **更新文档**
   - 在主页添加更新日志
   - 更新版本历史
   - 添加使用示例

3. **监控反馈**
   - 关注 GitHub Issues
   - 回应用户评论
   - 收集改进建议

---

## 📸 截图参考

### Release 页面布局

```
┌─────────────────────────────────────────────┐
│  Draft a new release                         │
├─────────────────────────────────────────────┤
│                                              │
│  Choose a tag:  [v0.2.0        ▼]           │
│  Target:       [main           ▼]           │
│                                              │
│  Release title:                              │
│  🎉 KINXKit v0.2.0 - Phase 2 核心功能完成    │
│                                              │
│  Describe this release:                      │
│  ┌─────────────────────────────────────┐    │
│  │ ## 🎉 KINXKit v0.2.0 重大更新       │    │
│  │                                    │    │
│  │ ### ✨ 新增项目模板系统            │    │
│  │ ... (完整的 Release Notes)         │    │
│  │                                    │    │
│  └─────────────────────────────────────┘    │
│                                              │
│  □ Set as a pre-release                     │
│                                              │
│  [Publish release]                           │
│                                              │
└─────────────────────────────────────────────┘
```

---

## 💡 常见问题

### Q: 标签 v0.2.0 不存在怎么办？

**A**: GitHub 会提示创建新标签，点击确认即可。

### Q: 发布后如何修改？

**A**:
1. 访问 Release 页面
2. 点击右上角的 **"Edit release"**
3. 修改内容后点击 **"Update release"**

### Q: 如何删除错误的 Release？

**A**:
1. 访问 Release 页面
2. 点击右上角的 **"Delete release"**
3. 确认删除（注意：此操作不可逆）

### Q: Release 创建失败怎么办？

**A**: 检查以下几点：
- GitHub Token 是否有效
- 是否有仓库的写入权限
- 标签名格式是否正确（应为 v0.2.0）
- 网络连接是否正常

---

## 📞 需要帮助？

如果遇到问题，可以：
- 查看 [GitHub 官方文档](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)
- 提交 [Issue](https://github.com/Cherny0306/KINXKit/issues)
- 联系维护者

---

**准备好了吗？开始创建你的第一个 Release 吧！** 🚀
