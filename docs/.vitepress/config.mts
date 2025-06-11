import { defineConfig } from 'vitepress'

// 插件：自动生成侧边栏,文档：https://vitepress-sidebar.jooy2.com/guide/getting-started
import { generateSidebar } from 'vitepress-sidebar';

// 插件：Mermaid流程图
import { MermaidMarkdown, MermaidPlugin } from 'vitepress-plugin-mermaid';


// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "WYH的知识库",
  description: "全栈 + 偏后端 + 懂运维 + 有系统性思维",
  lastUpdated: true,
  cleanUrls: true,
  markdown: {
    config(md){
      md.use(MermaidMarkdown)
    },
    theme: {
      light: 'vitesse-light',
      dark:'vitesse-dark'
    },
    //行号显示
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
      message: '总访问量<span id="busuanzi_value_site_pv"/>次,总访问人数 <span id="busuanzi_value_site_uv" /> 人次',
      copyright: `Copyright © 2024-${new Date().getFullYear()}  WYH`
    },
    nav: [
      { text: '站点', link: '/nav/' },
      { text: '架构师视角', link: '/architecture/' },
      { text: '后端', link: '/backend/' },
      { text: '前端', link: '/frontend/' },
      { text: 'DevOps', link: '/ops/' },
      { text: '项目管理', link: '/projects/' },
      { text: '工具箱', link: '/tool/' },
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
