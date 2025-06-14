English | [中文](./README.md)

# WYH的个人知识库和博客
这是WYH的个人知识库和博客，记录和分享全栈开发技术知识内容。
欢迎访问 [wangyonghao.github.io](wangyonghao.github.io)

## 开始
```
# 1. 克隆仓库
git clone https://github.com/wangyonghao/wangyonghao.github.io.git
# 2. 安装依赖
npm install
# 3. 本地预览, 访问 http://localhost:5173
npm run dev
# 4. 构建静态 HTML 文件， 输出目录 docs/.vitepress/dist
npm run build
# 5. 预览构建结果
npm run preview
```

# 功能扩展 

记录本站点扩展了哪些功能

- [x] 自动部署：Push 事件触发 Github Actions 流水线发布文件到Github Pages 站点。 参考 [Github Pages 部署指南](https://vitepress.dev/zh/guide/deploy#github-pages)。
- [x] 自动生成侧边栏：按目录结构自动生成侧边栏（Sidebar），支持为顶部导航配置不同的侧边栏。参考 [@jooy2/vitepress-sidebar](https://github.com/jooy2/vitepress-sidebar) 安装插件。
- [x] Markdown 绘制流程图： 可以使用 [Mermaid](https://github.com/mermaid-js/mermaid/blob/develop/README.zh-CN.md) 语法绘制流程图、状态图、时序图、甘特图、饼图等。Typora 也支持 `mermaid` 语法。参考 [Yiov 的 config.mts 配置](https://github.com/Yiov/vitepress-doc/blob/main/docs/.vitepress/config.mts) 安装插件。
- [x] 站点导航：实现与站点风格一致的导航页，参考 [茂茂笔记](https://github.com/maomao1996/mm-notes)。
- [x] 主题美化：参照 [Yiou的 Vitepress 教程](https://vitepress.yiov.top/style.html)，修改样式
  - [x] H1标题渐变色
  - [x] 取消链接下划线
  - [x] 修改引用块颜色
  - [x] 修改提示块颜色
  - [x] 顶栏毛玻璃效果
  - [x] 隐藏下横条
  - [x] 文案记号笔效果
- [x] 文章阅读数统计：
- [x] [时间线](https://vitepress.yiov.top/plugin.html#%E6%97%B6%E9%97%B4%E7%BA%BF)
- [x] [图片缩放](https://vitepress.yiov.top/plugin.html#%E5%9B%BE%E7%89%87%E7%BC%A9%E6%94%BE)
- [x] [网站访问量](https://vitepress.yiov.top/plugin.html#%E6%B5%8F%E8%A7%88%E9%87%8F)
- [x] [路由切换进度条](https://vitepress.yiov.top/plugin.html#%E5%88%87%E6%8D%A2%E8%B7%AF%E7%94%B1%E8%BF%9B%E5%BA%A6%E6%9D%A1)
- [x] [Giscus评论](https://vitepress.yiov.top/plugin.html#%E8%AF%84%E8%AE%BA)



## 主要参考资料来源：

- [VitePress 官方文档](https://vitepress.dev/)
- [Yiov的VitePress定制教程](https://vitepress.yiov.top/)
- [查尔斯的知识库](https://github.com/Charles7c/charles7c.github.io) 
- [茂茂笔记](https://notes.fe-mm.com/daily-notes/issue-38#%E4%BD%BF%E7%94%A8-vitepress-%E6%89%93%E9%80%A0%E4%B8%AA%E4%BA%BA%E5%89%8D%E7%AB%AF%E5%AF%BC%E8%88%AA%E7%BD%91%E7%AB%99)
-  [CatCoding 博客](https://catcoding.me/)

## 协议
- 文章采用[CC 4.0 BY-SA](http://creativecommons.org/licenses/by-sa/4.0/) 协议进行许可，转载需注明原作者及来源。
- 代码采用 [MIT](https://opensource.org/license/mit/) 协议进行许可，你可以自由的修改、再发布，但要求你保留原作者署名。