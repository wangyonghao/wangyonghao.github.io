# 个人知识库和博客

这是一个使用 VitePress 构建的个人知识库和博客。

## 快速开始

### 环境要求
- Node.js (建议使用最新 LTS 版本)

### 本地开发和预览
```bash
npm install
npm run docs:dev
```
通常，服务会运行在 `http://localhost:5173`。

### 构建静态站点
执行以下命令可以将文档构建为静态 HTML 文件，输出目录默认为 `docs/.vitepress/dist`：
```bash
npm run docs:build
```
在本地构建完成后，可以使用以下命令预览生成的静态站点：
```bash
npm run docs:preview
```

## 升级 VitePress
如果你想升级 VitePress 到最新版本，可以执行以下命令：
```bash
npm add -D vitepress@latest
```

## 项目结构
- `docs/`: 存放所有 Markdown 文档内容。
  - `.vitepress/`: VitePress 的配置文件和主题自定义相关文件。
    - `config.mts`: VitePress 的主要配置文件。
- `package.json`: 项目依赖和脚本配置。

## 内容组织

本知识库和博客的内容主要围绕以下几个方面：

- 技术架构
- 后端开发
- 前端开发
- 运维部署
- 项目管理
- 工具使用

欢迎访问和交流！