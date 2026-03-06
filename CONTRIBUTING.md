# 贡献指南

感谢您对 KINXKit 项目的关注！我们欢迎任何形式的贡献。

## 如何贡献

### 报告问题

如果您发现了 bug 或有功能建议：

1. 检查 [Issues](../../issues) 确保问题未被报告
2. 使用问题模板创建新的 Issue
3. 提供详细的信息和复现步骤

### 提交代码

#### 开发环境设置

```bash
# 1. Fork 仓库到您的 GitHub 账号

# 2. 克隆您的 fork
git clone https://github.com/yourusername/KINXKit.git
cd KINXKit

# 3. 安装依赖
npm install

# 4. 创建开发分支
git checkout -b feature/your-feature-name
```

#### 开发流程

```bash
# 1. 进行开发
# 遵循项目的代码规范和结构

# 2. 构建项目
npm run build

# 3. 运行测试
npm test

# 4. 运行代码检查
npm run lint
npm run format:check

# 5. 提交代码
git add .
git commit -m "feat: 添加某功能描述"

# 6. 推送到您的 fork
git push origin feature/your-feature-name
```

#### Pull Request

1. 访问您 fork 的仓库页面
2. 点击 "New Pull Request"
3. 选择您的功能分支
4. 填写 PR 模板
5. 等待审查和合并

### 代码规范

#### TypeScript

- 使用 TypeScript 严格模式
- 所有函数和变量必须有类型注解
- 遵循项目的命名规范

```typescript
// ✅ 好的做法
async function createProject(name: string): Promise<void> {
  try {
    await generator.generate(name);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    logger.error('创建失败', { error: message });
  }
}

// ❌ 不好的做法
function createProject(name) {
  generator.generate(name).catch(err => console.error(err));
}
```

#### Commit 规范

遵循 [Conventional Commits](https://www.conventionalcommits.org/) 规范：

```
feat: 添加新功能
fix: 修复 bug
docs: 更新文档
style: 代码格式调整
refactor: 重构代码
test: 添加测试
chore: 构建过程或辅助工具的变动
```

#### 测试要求

- 新功能必须包含测试
- 测试覆盖率不低于 80%
- 所有测试必须通过才能合并

```bash
# 运行测试
npm test

# 生成覆盖率报告
npm run test:coverage
```

### 项目结构

请遵循以下项目结构：

```
src/
├── commands/       # CLI 命令
├── core/          # 核心模块
├── nlp/           # 自然语言处理
├── prompt/        # 交互式提示
└── utils/         # 工具函数
```

### 文档要求

- 新功能需要更新相关文档
- API 变更需要更新 README.md
- 重大变更需要更新 CHANGELOG.md

### 代码审查

所有 PR 需要通过：

1. ✅ 所有测试通过
2. ✅ 代码覆盖率不低于 80%
3. ✅ 无 ESLint 警告
4. ✅ 至少一位维护者审查通过
5. ✅ CI 检查通过

## 行为准则

- 尊重所有贡献者
- 欢迎新手提问
- 建设性的反馈
- 专注于做什么对项目最好

## 获取帮助

- 查看 [README.md](../../README.md)
- 查看 [CLAUDE.md](../../CLAUDE.md)
- 查看 [QUICKREF.md](../../QUICKREF.md)
- 提交 Issue 寻求帮助

## 许可证

通过贡献代码，您同意您的贡献将在与项目相同的 [MIT License](../../LICENSE) 下发布。

---

再次感谢您的贡献！🎉
