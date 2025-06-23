import { DefaultTheme } from 'vitepress'
// 插件：自动生成侧边栏,文档：https://vitepress-sidebar.jooy2.com/guide/getting-started
import { generateSidebar } from 'vitepress-sidebar';

export const nav = <DefaultTheme.NavItem[]>[
  { text: '导航', link: '/sites/' },
  {
    text: '技术栈',
    items: [
      { text: 'Java', link: '/stack/java/' },
      { text: 'Vue', link: '/stack/vue/' },
      // { text: '数据库', link: '/stack/database/' },
      // { text: '中间件', link: '/stack/middleware/' },
      // { text: '算法', link: '/stack/algorithm/' },
    ]
  },
  {
    text: '方法论', link: '/methodology/',
  },
  {
    text: 'DevOps', link: '/devops/'
  },
  {
    text: '工具篇', link: '/tool/'
  },
  // { text: '日常笔记', link: '/notes/' },
]

const generaterOptions = (navName: string) => ({
  documentRootPath: '/docs',
  scanStartPath: navName,
  basePath: `/${navName}/`,
  resolvePath: `/${navName}/`,
  collapsed: false,
  collapseDepth: 2,
  useTitleFromFileHeading: true
})

export const sidebar = generateSidebar([
  generaterOptions('methodology'),
  generaterOptions('stack/java'),
  generaterOptions('stack/database'),
  generaterOptions('devops'),
  generaterOptions('tool'),
])
