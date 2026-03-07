# KINXKit 用户教程

> 从零开始，5分钟创建你的第一个项目

---

## 🚀 快速开始

### 前置要求

在开始之前，确保你的系统已安装：

- **Node.js** (v16 或更高)
- **Docker** (可选，用于容器化部署)
- **Git** (可选，用于版本控制)

### 安装 KINXKit

```bash
# 克隆仓库
git clone https://github.com/Cherny0306/KINXKit.git
cd KINXKit

# 安装依赖
npm install

# 构建项目
npm run build

# 验证安装
node dist/index.js --help
```

---

## 📚 教程目录

### 1. 创建你的第一个项目

#### 场景：创建一个 AI 聊天机器人

```bash
# 运行创建命令
node dist/index.js create my-ai-bot

# KINXKit 会引导你完成以下步骤：
# 1. 检查你的环境
# 2. 理解你的需求
# 3. 推荐技术栈
# 4. 生成项目代码
# 5. 配置 Docker
```

**项目结构**：
```
my-ai-bot/
├── app/
│   ├── main.py           # FastAPI 应用
│   ├── ai.py             # AI 集成
│   └── models.py         # 数据模型
├── Dockerfile            # Docker 配置
├── docker-compose.yml    # 服务编排
├── requirements.txt      # Python 依赖
└── .env.example          # 环境变量模板
```

**启动项目**：
```bash
cd my-ai-bot

# 配置 API 密钥
node ../dist/index.js config api

# 启动服务
docker-compose up

# 访问 http://localhost:8000
```

---

### 2. 创建数据分析项目

#### 场景：销售数据分析仪表板

```bash
# 创建项目
node dist/index.js create sales-dashboard

# 选择 "Python 数据分析"
```

**核心功能**：
```python
from app.data_loader import DataLoader
from app.analyzer import DataAnalyzer
from app.visualizer import DataVisualizer

# 加载数据
loader = DataLoader()
df = loader.load_csv('sales.csv')

# 分析数据
analyzer = DataAnalyzer(df)
stats = analyzer.get_statistics()

# 可视化
visualizer = DataVisualizer(df)
visualizer.plot_histogram('sales')
visualizer.plot_time_series('date', 'revenue')
```

**启动 Jupyter**：
```bash
docker-compose up

# 访问 http://localhost:8888
# 开始交互式分析！
```

---

### 3. 创建 Web 应用

#### 场景：任务管理 API

```bash
# 创建项目
node dist/index.js create task-api

# 选择 "Node.js Web 应用"
```

**API 端点**：
```
GET  /health          # 健康检查
GET  /api/tasks       # 获取任务列表
POST /api/tasks       # 创建任务
GET  /api/tasks/:id   # 获取任务详情
PUT  /api/tasks/:id   # 更新任务
DELETE /api/tasks/:id # 删除任务
```

**开发模式**：
```bash
cd task-api

# 安装依赖
npm install

# 开发模式（热重载）
npm run dev

# 访问 http://localhost:3000
```

**生产部署**：
```bash
# 构建
npm run build

# Docker 部署
docker build -t task-api .
docker run -p 3000:3000 task-api
```

---

## 🔧 常见使用场景

### 场景 1：使用 GitHub 创建仓库

```bash
# 1. 登录 GitHub
node dist/index.js github login

# 2. 创建项目
node dist/index.js create my-project

# 3. 推送到 GitHub
node dist/index.js github create \
  --path ./my-project \
  --name "my-project" \
  --description "My awesome project"

# 4. 仓库已创建并推送！
# 访问: https://github.com/USERNAME/my-project
```

### 场景 2：配置多个 API 服务

```bash
# 1. 配置 OpenAI
node dist/index.js config api
# 选择: OpenAI
# 输入 API 密钥

# 2. 配置数据库
node dist/index.js config database
# 选择: PostgreSQL
# 输入连接信息

# 3. .env 文件已自动生成
cat .env
```

### 场景 3：环境诊断

```bash
# 运行完整诊断
node dist/index.js doctor

# 显示详细建议
node dist/index.js doctor --verbose
```

**诊断报告示例**：
```
🏥 KINXKit 环境诊断

基础环境:
  ✓ 操作系统: Windows 11
  ✓ Docker: 已安装 (v24.0.0)
  ✓ Git: 已安装 (v2.44.0)
  ⚠ Python: 未安装

GitHub:
  ✓ GitHub 已认证 (cli)
  用户: Cherny0306

建议:
  - 安装 Python 以支持数据分析项目
  - 运行: winget install Python.Python.3.11
```

---

## 💡 最佳实践

### 1. 项目命名规范

```bash
# ✅ 好的项目名
node dist/index.js create task-manager
node dist/index.js create ai-assistant
node dist/index.js create data-pipeline

# ❌ 避免使用
node dist/index.js create my-project
node dist/index.js create test
node dist/index.js create project1
```

### 2. 环境配置管理

```bash
# 始终使用 .env.example
cp .env.example .env

# 编辑 .env 文件
nano .env

# 不要提交 .env 到 Git
echo ".env" >> .gitignore
```

### 3. Docker 最佳实践

```bash
# 使用 docker-compose 管理服务
docker-compose up -d

# 查看日志
docker-compose logs -f

# 停止服务
docker-compose down

# 清理资源
docker-compose down -v
```

### 4. 版本控制工作流

```bash
# 1. 创建项目
node dist/index.js create my-project

# 2. 初始化 Git
cd my-project
git init

# 3. 创建 .gitignore
node ../dist/index.js doctor --gitignore > .gitignore

# 4. 第一次提交
git add .
git commit -m "Initial commit"

# 5. 推送到 GitHub
node ../dist/index.js github create --path . --name my-project
```

---

## 🛠️ 故障排除

### 问题 1：Docker 启动失败

**症状**：
```
Error: Cannot connect to the Docker daemon
```

**解决方案**：
```bash
# Windows/Mac
# 确保 Docker Desktop 正在运行

# Linux
sudo systemctl start docker
sudo usermod -aG docker $USER

# 验证
docker --version
docker ps
```

### 问题 2：端口被占用

**症状**：
```
Error: Port 3000 is already in use
```

**解决方案**：
```bash
# 查找占用端口的进程
# Windows
netstat -ano | findstr :3000

# Linux/Mac
lsof -i :3000

# 杀死进程或更换端口
# 修改 .env 文件
PORT=3001
```

### 问题 3：Python 依赖安装失败

**症状**：
```
Error: Failed to install Python packages
```

**解决方案**：
```bash
# 使用虚拟环境
python -m venv venv
source venv/bin/activate  # Linux/Mac
# 或
venv\Scripts\activate     # Windows

# 升级 pip
pip install --upgrade pip

# 安装依赖
pip install -r requirements.txt
```

### 问题 4：GitHub 认证失败

**症状**：
```
Error: GitHub authentication failed
```

**解决方案**：
```bash
# 使用 GitHub CLI 认证
node dist/index.js github login

# 或设置 Token
export GITHUB_TOKEN=your_token_here

# 验证
node dist/index.js github status
```

### 问题 5：TypeScript 编译错误

**症状**：
```
Error: TypeScript compilation failed
```

**解决方案**：
```bash
# 清理构建产物
npm run clean

# 重新安装依赖
rm -rf node_modules package-lock.json
npm install

# 重新构建
npm run build
```

---

## 📖 进阶教程

### 1. 自定义项目模板

```bash
# 创建自定义模板目录
mkdir -p ~/.kinxkit/templates/my-template

# 复制现有模板
cp -r templates/python/data-analysis ~/.kinxkit/templates/my-template

# 修改模板
cd ~/.kinxkit/templates/my-template
# 编辑文件...

# 使用自定义模板
node dist/index.js create my-project --template my-template
```

### 2. 批量创建项目

```bash
# 创建脚本
cat > create-projects.sh << 'EOF'
#!/bin/bash
projects=("api-gateway" "auth-service" "user-service")

for project in "${projects[@]}"; do
  node dist/index.js create $project
  cd $project
  node ../dist/index.js config api
  cd ..
done
EOF

# 运行脚本
chmod +x create-projects.sh
./create-projects.sh
```

### 3. CI/CD 集成

```yaml
# .github/workflows/ci.yml
name: CI

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest

    steps:
      - uses: actions/checkout@v3

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '20'

      - name: Install KINXKit
        run: |
          git clone https://github.com/Cherny0306/KINXKit.git
          cd KINXKit
          npm install
          npm run build

      - name: Create Test Project
        run: |
          cd KINXKit
          node dist/index.js create test-project

      - name: Run Tests
        run: |
          cd KINXKit
          npm test
```

---

## 🎓 学习资源

### 官方文档

- [项目说明](PROJECT_SPEC.md)
- [开发指南](CLAUDE.md)
- [API 文档](docs/api.md)
- [贡献指南](CONTRIBUTING.md)

### 示例项目

- [AI 聊天机器人示例](examples/ai-chatbot.md)
- [数据分析项目示例](examples/data-analysis.md)
- [Web 应用示例](examples/web-app.md)

### 社区资源

- [GitHub Issues](https://github.com/Cherny0306/KINXKit/issues)
- [讨论区](https://github.com/Cherny0306/KINXKit/discussions)
- [更新日志](CHANGELOG.md)

---

## 🤝 获取帮助

### 遇到问题？

1. **查看文档**: 先查阅相关文档
2. **运行诊断**: `kinx doctor --verbose`
3. **搜索 Issues**: 查看是否有类似问题
4. **提交 Issue**: 如果问题未解决，创建新 Issue

### 提交 Issue 时请包含：

- KINXKit 版本: `node dist/index.js --version`
- 操作系统和版本
- 完整的错误信息
- 复现步骤
- 预期行为 vs 实际行为

---

## 🎉 开始你的项目之旅

现在你已经掌握了 KINXKit 的基础知识，开始创建你的项目吧！

```bash
# 创建你的第一个项目
node dist/index.js create my-awesome-project

# 需要帮助？
node dist/index.js --help

# 运行诊断
node dist/index.js doctor
```

**祝你开发愉快！** 🚀
