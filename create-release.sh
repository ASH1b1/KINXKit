#!/bin/bash
# GitHub Release 创建脚本
# 使用方法: ./create-release.sh

set -e

# 配置
REPO_OWNER="Cherny0306"
REPO_NAME="KINXKit"
TAG_NAME="v0.2.0"
RELEASE_TITLE="🎉 KINXKit v0.2.0 - Phase 2 核心功能完成"
RELEASE_NOTES_FILE="RELEASE_NOTES_v0.2.0.md"

# 颜色输出
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}KINXKit GitHub Release 创建脚本${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""

# 检查 GitHub Token
if [ -z "$GITHUB_TOKEN" ]; then
    echo -e "${YELLOW}未检测到 GITHUB_TOKEN 环境变量${NC}"
    echo ""
    echo "请先设置 GitHub Token:"
    echo "  1. 访问 https://github.com/settings/tokens"
    echo "  2. 生成新的 Personal Access Token"
    echo "  3. 授予 'repo' 权限"
    echo "  4. 运行: export GITHUB_TOKEN='your_token_here'"
    echo ""
    exit 1
fi

# 读取 Release Notes
if [ ! -f "$RELEASE_NOTES_FILE" ]; then
    echo -e "${RED}错误: 找不到 $RELEASE_NOTES_FILE${NC}"
    exit 1
fi

RELEASE_BODY=$(cat "$RELEASE_NOTES_FILE")

# 创建 Release
echo -e "${GREEN}正在创建 GitHub Release...${NC}"
echo ""

RESPONSE=$(curl -X POST \
  -H "Authorization: token $GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/$REPO_OWNER/$REPO_NAME/releases" \
  -d "{
    \"tag_name\": \"$TAG_NAME\",
    \"target_commitish\": \"main\",
    \"name\": \"$RELEASE_TITLE\",
    \"body\": $(echo "$RELEASE_BODY" | jq -Rs .),
    \"draft\": false,
    \"prerelease\": false,
    \"generate_release_notes\": false
  }")

# 检查响应
if echo "$RESPONSE" | grep -q '"html_url"'; then
    RELEASE_URL=$(echo "$RESPONSE" | jq -r '.html_url')
    echo -e "${GREEN}✓ Release 创建成功！${NC}"
    echo ""
    echo -e "${GREEN}访问地址:${NC} $RELEASE_URL"
    echo ""
else
    echo -e "${RED}✗ Release 创建失败${NC}"
    echo ""
    echo "错误信息:"
    echo "$RESPONSE" | jq -r '.message // .errors // .'
    exit 1
fi
