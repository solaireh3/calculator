# 剩余价值计算器 / Remaining Value Calculator

本项目是一个基于 Web 的剩余价值计算器，用户可以通过输入汇率、金额、周期等信息来计算剩余价值。此项目主要由 HTML、CSS、JavaScript 和 Node.js 构成。

## 目录

- [环境要求](#环境要求)
- [安装步骤](#安装步骤)
- [运行应用程序](#运行应用程序)
- [使用说明](#使用说明)
- [项目结构](#项目结构)
- [贡献指南](#贡献指南)
- [许可证信息](#许可证信息)
- [常见问题与注意事项](#常见问题与注意事项)

## 环境要求

在开始之前，请确保您的开发环境满足以下要求：

- Node.js 版本 >= 12
- 浏览器支持最新的 HTML5 和 JavaScript
- 一个文本编辑器（推荐使用 VSCode）

## 安装步骤

1. **克隆此项目**

   ```bash
   git clone https://github.com/SolaireH3/calculator.git
   cd calculator
2. **安装依赖**
   
   ```bash
   npm install

   该命令将安装项目所需的所有依赖项。

## 运行应用程

1. **安装 PM2**
首先，在命令行中运行以下命令安装 PM2：
```bash
npm install -g pm2

2. **使用 PM2 启动应用程序**
使用 PM2 启动 server.js，使其在后台常驻运行：
```bash
pm2 start server.js --name remaining-value-calculator

3. **访问应用程序**
打开浏览器，访问以下地址：

http://localhost:3000

应用程序现在应该可以在浏览器中使用了。

## 使用说明

1.汇率设置：页面上会自动获取当前选定货币的汇率。用户可以自定义汇率。
2.续费金额：输入金额并选择币种（默认币种为美元）。
3.续费周期：选择适当的续费周期，如月付、年付等。
4.日期设置：设置到期时间和交易日期。
5.出价金额：输入出价金额以计算溢价金额。
6.点击“计算剩余价值”按钮查看结果。

## 项目结构
```bash
calculator/
│
├── index.html       # 主页面文件
├── script.js        # 处理页面逻辑的 JavaScript 文件
└── server.js        # 基于 Node.js 的服务器文件

index.html 包含了页面的布局和样式
script.js 包含了前端计算逻辑
server.js 负责运行本地服务器

## 贡献指南

欢迎任何形式的贡献！如果您发现了问题或有新的建议，请随时提交 Issue 或创建 Pull Request。
1.Fork 这个仓库
2.创建一个分支：git checkout -b feature-branch
3.提交你的更改：git commit -m 'Add some feature'
4.推送到分支：git push origin feature-branch
5.创建一个新的 Pull Request

## 许可证信息

此项目使用 MIT 许可证，您可以自由地使用和修改项目代码。

## 常见问题与注意事项

API 密钥设置：您需要在 script.js 中替换您的汇率 API 密钥 (You_ApiKey)。
浏览器支持：请使用支持最新标准的浏览器以获得最佳体验。
日期和时间：本应用中所有日期均以东八区时间显示。
