@echo off
REM GitHub Release 创建脚本 (Windows)
REM 使用方法: create-release.bat

setlocal enabledelayedexpansion

echo ========================================
echo KINXKit GitHub Release 创建脚本
echo ========================================
echo.

REM 检查 GitHub Token
if "%GITHUB_TOKEN%"=="" (
    echo 未检测到 GITHUB_TOKEN 环境变量
    echo.
    echo 请先设置 GitHub Token:
    echo   1. 访问 https://github.com/settings/tokens
    echo   2. 生成新的 Personal Access Token
    echo   3. 授予 'repo' 权限
    echo   4. 运行: set GITHUB_TOKEN=your_token_here
    echo.
    pause
    exit /b 1
)

REM 配置
set REPO_OWNER=Cherny0306
set REPO_NAME=KINXKit
set TAG_NAME=v0.2.0
set RELEASE_TITLE=🎉 KINXKit v0.2.0 - Phase 2 核心功能完成
set RELEASE_NOTES_FILE=RELEASE_NOTES_v0.2.0.md

REM 检查 Release Notes 文件
if not exist "%RELEASE_NOTES_FILE%" (
    echo 错误: 找不到 %RELEASE_NOTES_FILE%
    pause
    exit /b 1
)

echo 正在创建 GitHub Release...
echo.

REM 创建 JSON 数据文件
echo { > release_data.json
echo   "tag_name": "%TAG_NAME%", >> release_data.json
echo   "target_commitish": "main", >> release_data.json
echo   "name": "%RELEASE_TITLE%", >> release_data.json
echo   "body": "", >> release_data.json
echo   "draft": false, >> release_data.json
echo   "prerelease": false, >> release_data.json
echo   "generate_release_notes": false >> release_data.json
echo } >> release_data.json

REM 使用 curl 创建 Release
curl -X POST ^
  -H "Authorization: token %GITHUB_TOKEN%" ^
  -H "Accept: application/vnd.github.v3+json" ^
  -H "Content-Type: application/json" ^
  -d @release_data.json ^
  "https://api.github.com/repos/%REPO_OWNER%/%REPO_NAME%/releases" ^
  --ssl-no-revoke

REM 清理临时文件
del release_data.json

echo.
echo ========================================
echo Release 创建完成！
echo ========================================
echo.
echo 访问地址查看 Release:
echo https://github.com/%REPO_OWNER%/%REPO_NAME%/releases/tag/%TAG_NAME%
echo.

pause
