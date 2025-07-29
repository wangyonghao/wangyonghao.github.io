import DefaultTheme from 'vitepress/theme'
import { onMounted, watch, nextTick,h } from 'vue'
import { inBrowser,useData, useRoute } from 'vitepress'

// 插件：文章评论
import giscusTalk from 'vitepress-plugin-comment-with-giscus';
// 插件：图片缩放
import mediumZoom from 'medium-zoom';
// 插件：进度条
import { NProgress } from 'nprogress-v2/dist/index.js'
import 'nprogress-v2/dist/index.css'
// 插件：访问量计数，文档 http://busuanzi.ibruce.info/
import busuanzi from 'busuanzi.pure.js'
// 自定义样式导入已移除

// 自定义组件
import MNavLinks from './components/nav/MNavLinks.vue'
import Tag from './components/Tag.vue'
import ArticleMetadata from './components/ArticleMetadata.vue';
import Archive from './components/Archive.vue';
import ArticleList from './components/ArticleList.vue';

// 自定义样式
import './style/index.css'

// 彩虹背景动画样式
let homePageStyle: HTMLStyleElement | undefined

export default {
  extends: DefaultTheme,

  Layout: ()=>{
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    /* 自定义布局 */
    if(frontmatter.value?.layout === 'article-list'){
      return h(ArticleList, props)
    }

    return h(DefaultTheme.Layout, props)
  },
  enhanceApp({app , router }) {
    // 注册组件
    app.component('MNavLinks' , MNavLinks) // 站点导航
    app.component('Tag', Tag) // 标签页
    app.component('ArticleMetadata', ArticleMetadata); // 文章元数据
    app.component('Archive', Archive); // 归档页
    app.component('ArticleList', ArticleList); // 文章列表页

    if (inBrowser) {
      NProgress.configure({ showSpinner: false })
      router.onBeforeRouteChange = () => {
        NProgress.start() // 开始进度条
      }
      router.onAfterRouteChange = () => {
        busuanzi.fetch() // 刷新页面浏览量
         NProgress.done() // 停止进度条
       }
    }

    // 彩虹背景动画样式
    if (typeof window !== 'undefined') {
      watch(
        () => router.route.data.relativePath,
        () => updateHomePageStyle(location.pathname === '/'),
        { immediate: true },
      )
    }
  },
  setup(){
    const { frontmatter } = useData();
    const route = useRoute();
    const initZoom = () => {
      // 增加选择器 :not(.m-nav-layout img) ，禁用导航页图标的缩放功能
      mediumZoom('.main img:not(.m-nav-layout img)', { background: 'var(--vp-c-bg)' }); // 不显式添加{data-zoomable}的情况下为所有图像启用此功能
    };
    onMounted(() => {
      initZoom();
    });
    watch(
      () => route.path,
      () => nextTick(() => initZoom())
    );

    // Giscus 评论
    giscusTalk(
      {
        repo: 'wangyonghao/wangyonghao.github.io', //仓库
        repoId: 'MDEwOlJlcG9zaXRvcnkyMDkxMDIxMTM=', //仓库ID
        category: 'General', // 讨论分类
        categoryId: 'DIC_kwDODHalIc4CrMJd', //讨论分类ID
        mapping: 'pathname',
        inputPosition: 'bottom',
        lang: 'zh-CN',
        loading: 'lazy',
        crossorigin: "anonymous"
      },
      {
        frontmatter, route
      },
      //默认值为true，表示已启用；false表示未启用
      //您可以使用“comment:true”序言在页面上单独启用它
      true
    );
  },
}

// 彩虹背景动画样式
function updateHomePageStyle(value: boolean) {
  if (value) {
    if (homePageStyle) return

    homePageStyle = document.createElement('style')
    homePageStyle.innerHTML = `
    :root {
      animation: rainbow 12s linear infinite;
    }`
    document.body.appendChild(homePageStyle)
  } else {
    if (!homePageStyle) return

    homePageStyle.remove()
    homePageStyle = undefined
  }
}