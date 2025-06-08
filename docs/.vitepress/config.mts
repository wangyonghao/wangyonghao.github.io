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
    docFooter: {
      prev: '上一页',
      next: '下一页'
    },
    lastUpdated:{
      text: '最后更新于',
      formatOptions: {
        dateStyle: 'short', // 可选值full、long、medium、short
        timeStyle: 'short' // 可选值full、long、medium、short
      },
    },
    //编辑本页
    editLink: {
      pattern: 'https://github.com/wangyonghao/wangyonghao.github.io/edit/main/docs/:path', // 改成自己的仓库
      text: '编辑本页'
    },
    footer:{
      message: '总访问量<span id="busuanzi_value_site_pv"/>次,总访问人数 <span id="busuanzi_value_site_uv" /> 人次',
      copyright: 'Copyright © 2024-present WYH'
    },
    nav: [
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
  //   {
  //     '/architecture/': [
  //       {
  //         text: '系统设计',
  //         link: '/architecture/',
  //         collapsed: false,
  //         items: [
  //           { text: '系统架构', link: '/architecture/system-architecture' },
  //           { text: '分布式系统', link: '/architecture/distributed-system' },
  //           { text: '微服务', link: '/architecture/micro-service' },
  //           { text: '数据存储', link: '/architecture/data-storage'},
  //         ]
  //       },
  //       {
  //         text: 'Web 安全设计',
  //         link: '/architecture/web-security',
  //         collapsed: true,
  //         items: [
  //           { text: '认识安全漏洞', link: '/architecture/web-security/xss' },
  //           { text: 'CVSS评分', link: '/architecture/web-security/csrf' },
  //           { text: '安全加固', link: '/architecture/web-security/sql-injection' },
  //         ]
  //       },
  //       // {
  //       //   text:'认证',
  //       // }
  //     ],
  //     '/backend/': [
  //       {
  //         text: 'Java',
  //         items: [
  //           { text: 'Java知识体系', link: '/architecture/api-examples' },
  //           { text: 'JVM', link: '/architecture/api-examples' },
  //           { text: 'Java框架', link: '/architecture/api-examples' },
  //           { text: '安装ITAS应用', link: '/architecture/api-examples' },
  //           {
  //             text: '设计模式',
  //             link: '/backend/java/design-patterns',
  //             collapsed: true,
  //             items: [
  //               {
  //                 text: '创建型模式',
  //                 items: [
  //                   { text: '工厂方法', link: '/backend/java/design-patterns/FactoryPattern' },
  //                   { text: '抽象工厂', link: '/backend/java/design-patterns/AbstractFactoryPattern' },
  //                   { text: '生成器', link: '/backend/java/design-patterns/BuilderPattern' },
  //                   { text: '原型', link: '/backend/java/design-patterns/PrototypePattern' },
  //                   { text: '单例', link: '/backend/java/design-patterns/SingletonPattern' }
  //                 ]
  //               },
  //               {
  //                 text: '结构型模式',
  //                 items: [
  //                   { text: '适配器模式', link: '/backend/java/design-patterns/AdapterPattern' },
  //                   { text: '桥接模式', link: '/backend/java/design-patterns/BridgePattern' },
  //                   { text: '装饰器模式', link: '/backend/java/design-patterns/DecoratorPattern' },
  //                   { text: '外观模式', link: '/backend/java/design-patterns/FacadePattern' },
  //                   { text: '享元模式', link: '/backend/java/design-patterns/FlyweightPattern' },
  //                   { text: '代理模式', link: '/backend/java/design-patterns/ProxyPattern' }
  //                 ]
  //               },
  //               {
  //                 text: '行为型模式',
  //                 items: [
  //                   { text: '责任链模式', link: '/backend/java/design-patterns/ChainOfResponsibilityPattern' },
  //                   { text: '命令模式', link: '/backend/java/design-patterns/CommandPattern' },
  //                   { text: '解释器模式', link: '/backend/java/design-patterns/InterpreterPattern' },
  //                   { text: '迭代器模式', link: '/backend/java/design-patterns/IteratorPattern' },
  //                   { text: '中介者模式', link: '/backend/java/design-patterns/MediatorPattern' }
  //                 ]
  //               },
  //             ]
  //           },
  //         ]
  //       },
  //       {
  //         text: '数据库',
  //         items: [
  //           { text: 'Oracle', link: '/architecture/api-examples' },
  //           { text: 'MySQL',
  //             items: [
  //               {text: 'MySQL常用命令', link: '/backend/database/mysql/MySQL常用命令'  },
  //               {text: 'MySQL索引原理及慢查询优化', link: '/backend/database/mysql/MySQL索引原理及慢查询优化'  },
  //               {text: 'MySQL 问题排查', link: '/backend/database/mysql/mysql-insights'  },
  //             ]
  //           },
  //           { text: 'PostgreSQL', link: '/backend/database/postgresql' },
  //           { text: 'SQL Server', 
  //             items: [
  //               {text: 'SQL Server 数据备份', link: '/backend/database/mssql/mssql-ops' },
  //           ] },
  //         ]
  //       }
  //     ],
  //     '/frontend/': [
  //       {
  //         text: 'Javascript',
  //         items: [
  //           // { text: 'Java知识体系', link: '/java-knowledge' },
  //           // { text: 'Java框架', link: '/java-frameworks' },
  //           // { text: '安装ITAS应用', link: '/api-examples' },
  //         ]
  //       },
  //       {
  //         text: 'Vue.js',
  //         items: [
  //           // { text: 'Java知识体系', link: '/java-knowledge' },
  //           // { text: 'Java框架', link: '/java-frameworks' },
  //           // { text: '安装ITAS应用', link: '/api-examples' },
  //         ]
  //       },
  //       {
  //         text: 'React.js',
  //         items: [
  //           // { text: 'Java知识体系', link: '/java-knowledge' },
  //           // { text: 'Java框架', link: '/java-frameworks' },
  //           // { text: '安装ITAS应用', link: '/api-examples' },
  //         ]
  //       },
  //     ],
  //     '/ops/': [
  //       {
  //         text: '容器与编排',
  //         items: [
  //           { text: 'Docker', link: '/ops/docker', 
  //             collapsed: true,
  //             items: [
  //               { text: 'Docker 常用命令', link: '/ops/docker/docker-cli' },
  //               { text: 'Docker 核心概念', link: '/ops/docker/docker-concepts' },
  //               { text: 'Docker 运维', link: '/ops/docker/docker-ops' },
  //               { text: 'Docker 问题排查', link: '/ops/docker/docker-insights' },
  //             ]
  //           },
  //           { text: 'k8s', link: '/ops/k8s',  // Corrected link
  //             collapsed: true,
  //             items: [
  //               { text: 'Docker 常用命令', link: '/ops/docker/docker-cli' },
  //               { text: 'Docker 核心概念', link: '/ops/docker/docker-concepts' },
  //               { text: 'Docker 运维', link: '/ops/docker/docker-ops' },
  //               { text: 'Docker 问题排查', link: '/ops/docker/docker-insights' },
  //             ]
  //           },
  //         ]
  //       },
  //       {
  //         text: 'CI/CD',
  //         items:[
  //            { 
  //             text: 'CI/CD', link: '/ops/cicd', 
  //             collapsed: true,
  //             items: [
  //               { text: 'Gitlab CI/CD 实践', link: '/ops/cicd/gitlab-ci' },
  //             ]
  //           },
  //         ]
  //       }
  //     ],
  //     '/tool/': [
  //       {
  //         text: '常用命令',
  //         items: [
  //           { text: 'Mac 常用命令', link: '/tool/macos/mac-commands' },
  //           { text: 'Linux 常用命令', link: '/tool/linux/linux-commands' },
  //           { text: '使用 SSH 配置文件简化连接', link: '/tool/linux/ssh-config' },
  //         ]
  //       },
  //       {
  //         text: 'MacOS 开发环境',
  //         items: [
            
  //           { text: '打造舒服的 Mac 工作环境', link: '/tool/macos/mac-tips' },
  //           { text: 'Homebrew 指南', link: '/tool/macos/homebrew-guide' }, // Corrected link
  //           { text: 'Mac 配置与提效', link: '/tool/macos/mac-config' }, // Corrected link
  //         ]
  //       },
  //     ],
  //     '/projects/': [
  //       { text: 'CI/CD', items: [{ text: 'GitHub Actions', link: '/devops/github-actions' }] }
  //     ],
  //   },
    socialLinks: [
      { icon: 'github', link: 'https://github.com/wangyonghao' },
    ],
  }
})
