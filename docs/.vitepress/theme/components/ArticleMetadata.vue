<template>
  <div class="article-meta">
    <span v-if="isOriginal">原创: <a :href="authorLink" title="进入作者主页">{{ author }}</a></span>
    <span v-else>转载: <a :href="authorLink">{{ author }}</a></span>
    <span>发布于: {{ date }}</span>
    <span v-if="page.lastUpdated">更新于: {{ page.lastUpdated }}</span>
    <span v-if="tags">
      标签:
      <span v-for="(tag, index) in tags" :key="index">
        <a :href="`/tags?tag=${tag}`" target="_self" :title="tag">{{ tag }}</a>
        <span v-if="index != tags.length - 1">, </span>
      </span>
    </span>
  </div>
</template>

<script lang="ts" setup>
  import { useData } from 'vitepress';
  import { reactive } from 'vue';

  interface ArticleData {
    isOriginal: boolean;
    author: string;
    authorLink: string;
    title?: string;
    url: string;
    tags?: string[];
    description?: string;
    date?: string;
    [key: string]: any; // 允许其他 frontmatter 属性
  }

  // 定义文章属性
  const props = defineProps<{ article:ArticleData }>();

  // 初始化文章元数据信息
  const { theme, page } = useData();
  const data = reactive({
    isOriginal: props.article?.isOriginal ?? true,
    author: props.article?.author ?? theme.value.articleMetadataConfig.author,
    authorLink: props.article?.authorLink ?? theme.value.articleMetadataConfig.authorLink,
    date: props.article?.date,
    categories: props.article?.categories ?? [],
    tags: props.article?.tags ?? []
  });
// 初始化文章元数据信息
const { isOriginal, author, authorLink, date, tags } = data;

        

</script>

<style scoped>
.article-meta {
  margin-top: 10px;
  display: inline-block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: middle;
  color: var(--vp-c-text-2);
  cursor: default;
}
.article-meta span{
  margin-right: 1rem;
}
.article-meta a {
  font-weight: 400;
  color: var(--vp-c-text-2);
  text-decoration: none;
}
.article-meta a:hover {
  color: var(--vp-c-brand-1);
}
</style>