个人搭建地址，供参考：https://tool.xxxh.de 和 https://tool.xxxh.de
来大佬美化一下吧，太丑了(Doing...)

# 剩余价值计算器 / Remaining Value Calculator

本项目是一个基于 Web 的剩余价值计算器，用户可以通过输入汇率、金额、周期等信息来计算剩余价值。此项目主要由 HTML、CSS、JavaScript 和 Node.js 构成。

[TOC]
- [环境要求](###环境要求)
- [如何使用](###如何使用)
- [使用说明](###使用说明)
- [项目结构](###项目结构)
- [贡献指南](###贡献指南)
- [许可证信息](###许可证信息)
- [常见问题与注意事项](###常见问题与注意事项)

### 环境要求

在开始之前，请确保您的开发环境满足以下要求：

- 浏览器支持最新的 HTML5 和 JavaScript

### 如何使用

1. nginx托管方式

从仓库中下载所有文件，存放于服务器/home/xxx/Web/calculator目录下(示例路径)
在/etc/nginx/conf.d中增加配置文件calculator.conf
```
server {
  listen 80;
  server_name calculator.xxx.com;
  charset utf-8;
  location / {
        root /home/xxx/Web/calculator;
        index index.html;
  }
}
```
2. 使用Git Page托管
fork项目到自己的github仓库中，进入仓库——Settings——Pages中设置

3. 使用Cloudflare Pages托管
fork项目到自己的github仓库后，打开https://dash.cloudflare.com/，进入Workers 和 Pages——创建——Pages——连接到git，然后根据提示操作。

### 使用说明

1. 汇率设置：页面上会自动获取当前选定货币的汇率。用户可以自定义汇率。
2. 续费金额：输入金额并选择币种（默认币种为美元）。
3. 续费周期：选择适当的续费周期，如月付、年付等。
4. 日期设置：设置到期时间和交易日期。
5. 出价金额：输入出价金额以计算溢价金额。
6. 点击“计算剩余价值”按钮查看结果。

### 项目结构
```bash
calculator/
│
├── index.html       # 主页面文件
├── js               # 处理页面逻辑的JavaScript文件
└── css              # 页面样式CSS文件
```

### 贡献指南

欢迎任何形式的贡献！如果您发现了问题或有新的建议，请随时提交 Issue 或创建 Pull Request。
1. Fork 这个仓库
2. 创建一个分支：git checkout -b feature-branch
3. 提交你的更改：git commit -m 'Add some feature'
4. 推送到分支：git push origin feature-branch
5. 创建一个新的 Pull Request

### 许可证信息

此项目使用 [MIT 许可证](LICENSE)，您可以自由地使用和修改项目代码。

### 常见问题与注意事项

API 密钥设置：您需要在 script.js 中替换您的汇率 API 密钥 (You_ApiKey)。
浏览器支持：请使用支持最新标准的浏览器以获得最佳体验。
日期和时间：本应用中所有日期均以东八区时间显示。
