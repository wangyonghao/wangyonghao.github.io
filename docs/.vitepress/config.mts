import { defineConfig } from 'vitepress'
import { navbar, sidebar} from './config/navbar'
import markdown from './config/markdown'
import vite from './config/vite'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "WYH的知识库",
  description: "Web 全栈知识分享，懂前端 + 偏后端 + 会运维 + 有系统性思维",
  lastUpdated: true,
  cleanUrls: true,
  markdown,
  vite,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: navbar,
    sidebar,
    // 启用模糊全文搜索
    search: {
      provider: 'local'
    },
    darkModeSwitchLabel: '深浅模式',
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
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wangyonghao' },
    ],
    //编辑本页
    editLink: {
      pattern: 'https://github.com/wangyonghao/wangyonghao.github.io/edit/main/docs/:path', // 改成自己的仓库
      text: '编辑本页'
    },
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    },
    footer:{
      message: '总访问量<span id="busuanzi_value_site_pv"/>次<br/>总访问人数 <span id="busuanzi_value_site_uv" /> 人次',
      copyright: `Copyright © 2024-${new Date().getFullYear()}  WYH`
    },
    // 自定义扩展: 文章元数据配置
    // @ts-ignore
    articleMetadataConfig: {
      author: 'wyh', // 文章全局默认作者名称
      authorLink: 'https://wangyonghao.github.io', // 点击作者名时默认跳转的链接
    },
    // 自定义扩展: 文章版权配置
    copyrightConfig: {
      license: '署名-相同方式共享 4.0 国际 (CC BY-SA 4.0)',
      licenseLink: 'http://creativecommons.org/licenses/by-sa/4.0/'
    },
  }
})
