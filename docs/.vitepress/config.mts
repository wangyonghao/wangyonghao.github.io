import { defineConfig } from 'vitepress'

// 插件：自动生成侧边栏,文档：https://vitepress-sidebar.jooy2.com/guide/getting-started
import { generateSidebar } from 'vitepress-sidebar';

// 插件：Mermaid流程图
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid';

// 插件：PlantUML 图表
import markdownItTextualUml from "markdown-it-textual-uml"

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "WYH的知识库",
  description: "一个全栈开发者的技术笔记，懂前端 + 偏后端 + 会运维 + 有系统性思维",
  lastUpdated: true,
  cleanUrls: true,
  markdown: {
    config(md){
      md.use(MermaidMarkdown)

      // 添加Markdown扩展插件markdown-it-textual-uml，使其支持plantuml
      md.use(markdownItTextualUml);
    },
    theme: {
      light: 'vitesse-light',
      dark:'vitesse-dark'
    },
    // 行号显示
    lineNumbers: true,
    // 开启图片懒加载
    image: {
      lazyLoading: true
    },
  },
  vite:{
    plugins: [MermaidPlugin()],
    optimizeDeps: {
      include: ['mermaid'],
    },
    ssr: {
      noExternal: ['mermaid'],
    },
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    // 启用模糊全文搜索
    search: {
      provider: 'local'
    },
    
    darkModeSwitchLabel: '切换日光/暗黑模式',
    sidebarMenuLabel: '文章',
    returnToTopLabel: '返回顶部',
    outline:{
      level: 'deep',
      label: '目录'
    },
    lastUpdated:{
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short', // 可选值full、long、medium、short
        timeStyle: 'short' // 可选值full、long、medium、short
      },
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    //编辑本页
    editLink: {
      pattern: 'https://github.com/wangyonghao/wangyonghao.github.io/edit/main/docs/:path', // 改成自己的仓库
      text: '编辑本页'
    },
    footer:{
      message: '总访问量<span id="busuanzi_value_site_pv"/>次<br/>总访问人数 <span id="busuanzi_value_site_uv" /> 人次',
      copyright: `Copyright © 2024-${new Date().getFullYear()}  WYH`
    },
    nav: [
      {
        text: '方法论',
        items: [
          { text: '软件架构', link: '/architecture/' },
          // { text: '开发理论', link: '/ops/' },
          // { text: '网络安全', link: '/ops/' },
          // { text: '开源协议', link: '/ops/' },
          // { text: '分布式相关', link: '/ops/' },
          // { text: '开发流程', link: '/ops/' },
          // { text: '开发规范', link: '/projects/' },
          // { text: '设计模式', link: '/projects/' },
          // { text: '项目管理', link: '/projects/' },
        ]
      },
      {
        text: '技术栈',
        items: [
          { text: '前端', link: '/frontend/' },
          { text: '后端', link: '/backend/' },
          { text: '算法', link: '/backend/' },
        ]
      },

      { text: '工具链',
        items: [
          { text: '开发工具', link: '/tool/' },
          { text: '基础设施', link: '/projects/' },
          { text: '中间件', link: '/ops/' },
          { text: '开发资源', link: '/ops/' },
        ]
      },
      { text: '实战', link: '/backend/' },
      { text: '日常笔记', link: '/notes/' },
      { text: '导航', link: '/nav/' },
      { text: '关于我', link: '/me/' },
    ],
    sidebar: generateSidebar([
      {
        documentRootPath: 'docs',
        scanStartPath:'architecture',
        basePath: '/architecture/',
        resolvePath: '/architecture/',
        collapsed: false, 
        collapseDepth: 2,
        useTitleFromFileHeading: true
      },
      {
        documentRootPath: 'docs',
        scanStartPath:'backend',
        basePath: '/backend/',
        resolvePath: '/backend/',
        collapsed: false, 
        collapseDepth: 2,
        useTitleFromFileHeading: true
      },
      {
        documentRootPath: '/docs',
        scanStartPath:'ops',
        basePath: '/ops/',
        resolvePath: '/ops/',
        collapsed: false, 
        collapseDepth: 2,
        useTitleFromFileHeading: true
      },
      {
        documentRootPath: '/docs',
        scanStartPath:'project',
        basePath: '/project/',
        resolvePath: '/project/',
        collapsed: false, 
        collapseDepth: 2,
        useTitleFromFileHeading: true
      },
      {
        documentRootPath: '/docs',
        scanStartPath:'tool',
        basePath: '/tool/',
        resolvePath: '/tool/',
        collapsed: false, 
        collapseDepth: 2,
        useTitleFromFileHeading: true
      },
    ]),
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wangyonghao' },
    ],
  }
})
