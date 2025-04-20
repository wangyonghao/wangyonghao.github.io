import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: 'zh-CN',
  title: "知然空间",
  description: "全栈 + 偏后端 + 懂运维 + 有系统性思维",
  lastUpdated: true,
  cleanUrls: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '架构师视角', link: '/architecture/' },
      {
        text: '技术知识',
        items: [
          { text: '前端', link: '/frontend/' },
          { text: '后端', link: '/backend/' },
          { text: '运维', link: '/operation/' },
          { text: '软能力', link: '/skills/' },
        ]
      },
      { text: '项目', link: '/projects/' },
      { text: '最佳实践', link: '/best-practices/' },
      { text: '软能力', link: '/skills/' },
      { text: '研发工具集', link: '/tools/' },
      { text: '导航站', link: '/nav-site/' },
    ],

    sidebar: {
      '/architecture/': [
        {
          text: '架构师视角',
          items: [
            { text: '访问远程服务', link: '/architecture/api-examples' },
            { text: '事务处理', link: '/architecture/api-examples' },
            { text: '架构安全性', link: '/architecture/api-examples' },
          ]
        },
        { text: 'abc', link: '/api-examples' }
      ],

      '/backend/': [
        {
          text: '后端',
          items: [
            { text: 'Java知识体系', link: '/java-knowledge' },
            { text: 'Java框架', link: '/java-frameworks' },
            { text: '安装ITAS应用', link: '/api-examples' },
          ]
        }
      ],
      '/front/': [
        {
          text: '前端',
          items: [
            { text: 'Java知识体系', link: '/java-knowledge' },
            { text: 'Java框架', link: '/java-frameworks' },
            { text: '安装ITAS应用', link: '/api-examples' },
          ]
        }
      ],
      '/tools/': [
        {
          text: '消息队列',
          items: [
            { text: 'Java知识体系', link: '/java-knowledge' },
            { text: 'Java框架', link: '/java-frameworks' },
            { text: '安装ITAS应用', link: '/api-examples' },
          ]
        },
        {
          text: '数据库',
          items: [
            { text: 'Oracle', link: '/java-knowledge' },
            { text: 'SQLLite', link: '/java-frameworks' },
            { text: 'PostgreSQL', link: '/api-examples' },
            { text: 'MySQL', link: '/api-examples' },
          ]
        },
        {
          text: '开发工具',
          items: [
            { text: 'Intellij Idea', link: '/java-knowledge' },
            { text: 'VS Code', link: '/java-frameworks' },
            { text: 'Windsurf', link: '/api-examples' },
          ]
        },
      ],
      '/projects/': [
        { text: '部署', items: [{ text: 'Docker', link: '/devops/docker' }] },
        { text: 'CI/CD', items: [{ text: 'GitHub Actions', link: '/devops/github-actions' }] }
      ],
    },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wangyonghao' },
    ],
  }
})
