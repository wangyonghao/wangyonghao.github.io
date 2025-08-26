import { DefaultTheme } from 'vitepress'
// 插件：自动生成侧边栏,文档：https://vitepress-sidebar.jooy2.com/guide/getting-started
import { generateSidebar } from 'vitepress-sidebar';

export const navbar = <DefaultTheme.NavItem[]>[
  { text: '首页', link: '/' },
  { text: '归档', link: '/archives' },
  { text: '导航', link: '/nav' },
  {
    text: '专题',
    items: [
      { text: '', items:[
        { text: 'Java 基础', link: '/java/' },
        { text: 'Java 框架', link: '/java-framework/' },
      ]},
      { text: 'Software Design', link: '/software-design/' },
      { text: 'Database', link: '/datebase/' },
      { text: '', items:[
        { text: 'Docker', link: '/docker/' },
        { text: '工具篇', link: '/tool/' },
      ]},
    ]
  },
  { text: '关于', link: '/about' },
]

const generaterOptions = (navName: string) => ({
  documentRootPath: '/docs',
  scanStartPath: navName,
  basePath: `/${navName}/`,
  resolvePath: `/${navName}/`,
  collapsed: true,
  collapseDepth: 2,
  useTitleFromFileHeading: true,
  useFolderTitleFromIndexFile:true,
  useFolderLinkFromIndexFile:true,
  debugPrint:false, // 输出所有侧边栏结果
})

export const sidebar = generateSidebar([
  generaterOptions('ai'),
  generaterOptions('java'),
  generaterOptions('java-framework'),
  generaterOptions('database'),
  generaterOptions('docker'),
  generaterOptions('tool'),
  generaterOptions('software-design'),
])
