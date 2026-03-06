#!/bin/bash

echo "=== GitHub 推送脚本 ==="
echo ""

# 读取 GitHub 用户名
read -p "请输入您的 GitHub 用户名: " GITHUB_USERNAME

# 远程仓库 URL
REPO_URL="https://github.com/${GITHUB_USERNAME}/KINXKit.git"

echo ""
echo "配置远程仓库: $REPO_URL"
git remote add origin $REPO_URL

echo ""
echo "重命名主分支为 main..."
git branch -M main

echo ""
echo "推送代码到 GitHub..."
echo "这可能需要几分钟，取决于您的网络速度..."
git push -u origin main

echo ""
if [ $? -eq 0 ]; then
    echo "✅ 推送成功！"
    echo ""
    echo "您的仓库地址: $REPO_URL"
    echo ""
    echo "下一步操作:"
    echo "1. 访问 $REPO_URL 查看您的代码"
    echo "2. 设置仓库描述和标签"
    echo "3. 考虑添加 GitHub Actions 进行 CI/CD"
    echo "4. 更新 README.md 添加徽章和链接"
else
    echo "❌ 推送失败，请检查:"
    echo "1. 仓库是否已创建"
    echo "2. 用户名是否正确"
    echo "3. 网络连接是否正常"
    echo "4. 是否需要配置代理"
fi
