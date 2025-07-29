<template>
  <div class="meta-wrapper">
    <div class="meta-item">
      <span v-if="isOriginal">原创: <a :href="authorLink" title="进入作者主页">{{ author }}</a></span>
      <span v-else>转载: <a :href="authorLink">{{ author }}</a></span>
    </div>
    <div class="meta-item">
      <span v-if="isOriginal">发布于: </span>
      <span v-else>转载于: </span>
      <time :datetime="date.toISOString()" :title="dayjs(date).format('YYYY-MM-DD HH:mm')">{{ dayjs().to(dayjs(date))}}</time>
    </div>
    <div v-if="page.lastUpdated" class="meta-item">
      <span>更新于: </span>
      <time :datetime="date.toISOString()" :title="dayjs(page.lastUpdated).format('YYYY-MM-DD HH:mm')">{{ dayjs().to(dayjs(page.lastUpdated))}}</time>
    </div>
    <div class="meta-item">
      <span v-if="tags">
        标签: 
        <span v-for="(tag, index) in tags" :key="index">
          <a :href="`/tags?tag=${tag}`" target="_self" :title="tag">{{ tag }}</a>
          <span v-if="index != tags.length - 1">, </span>
        </span>
      </span>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { reactive, toRefs, onMounted } from 'vue';
  import { useData } from 'vitepress';
  import dayjs from 'dayjs';
  import 'dayjs/locale/zh-cn';
  import relativeTime from 'dayjs/plugin/relativeTime';
  import { goToLink } from '../utils.ts';

  dayjs.extend(relativeTime);
  dayjs.locale('zh-cn');

  // 定义文章属性
  const props = defineProps({
    article: Object,
    showCategory: {
      type: Boolean,
      default: true,
    },
  });

  console.log(props.article);

  // 初始化文章元数据信息
  const { theme, page } = useData();
  const data = reactive({
    isOriginal: props.article?.isOriginal ?? true,
    author: props.article?.author ?? theme.value.articleMetadataConfig.author,
    authorLink: props.article?.authorLink ?? theme.value.articleMetadataConfig.authorLink,
    showViewCount: theme.value.articleMetadataConfig?.showViewCount ?? false,
    viewCount: 0,
    date: new Date(props.article?.date),
    categories: props.article?.categories ?? [],
    tags: props.article?.tags ?? [],
    showCategory: props.showCategory
  });
  const { isOriginal, author, authorLink, showViewCount, viewCount, date, categories, tags, showCategory } = toRefs(data);
</script>

<style scoped>
.meta-wrapper {
  margin-top: 10px;
}

.meta-item {
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  max-width: 240px;
  color: var(--vp-c-text-2);
  cursor: default;
  font-size: 14px;
}
.meta-item:not(.tag) {
  margin-right: 1rem;
}
.meta-item.original {
  margin-right: 0.5rem;
  margin-top: -0.5px;
}
.meta-icon, meta-content {
  display: inline-block;
  margin-right: .375rem;
  vertical-align: middle;
}
.meta-content a {
  font-weight: 400;
  color: var(--vp-c-text-2);
  text-decoration: none;
}
.meta-content a:hover {
  color: var(--vp-c-brand-1);
}
</style>