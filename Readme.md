# 个人知识库和博客

这是一个使用 VitePress 构建的个人知识库和博客。

## 快速开始

### 环境要求

- Node.js (建议使用最新 LTS 版本)
- pnpm (或 npm/yarn)

### 安装依赖

```bash
pnpm install
# 或者 npm install
# 或者 yarn install
```

### 本地开发和预览

执行以下命令可以在本地启动开发服务器，并通过浏览器实时预览内容更改：

```bash
pnpm docs:dev
# 或者 npm run docs:dev
# 或者 yarn docs:dev
```

通常，服务会运行在 `http://localhost:5173`。

### 构建静态站点

执行以下命令可以将文档构建为静态 HTML 文件，输出目录默认为 `docs/.vitepress/dist`：

```bash
pnpm docs:build
# 或者 npm run docs:build
# 或者yarn docs:build
```

### 预览构建后的站点

在本地构建完成后，可以使用以下命令预览生成的静态站点：

```bash
pnpm docs:preview
# 或者 npm run docs:preview
# 或者 yarn docs:preview
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