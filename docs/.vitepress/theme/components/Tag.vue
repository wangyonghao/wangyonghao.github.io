<template>
  <!-- 标签列表区域 -->
  <div class="tag-list">
    <span
        v-for="(tag, tagTitle) in tags"
        :key="tagTitle"
        @click="toggleTag(tagTitle)"
        :class="['tag-item', selectTag === tagTitle ? 'tag-item-selected' : '']"
      > {{ tagTitle }} <span class="tag-count">{{ tag.length }}</span>
    </span>
  </div>
  <!-- 文章列表区域 -->
  <ul v-if="selectTag" class="article-list">
    <li v-for="(article, index) in tags[selectTag]" :key="index">
      <a :href="article.url" class="article-item">
        <span class="article-item-title">{{ article.title }}</span>
        <span class="article-item-date">{{ article.date.split(' ')[0] }}</span>
      </a>
    </li>
  </ul>
</template>

<script lang="ts" setup>
  import { computed, ref, onMounted } from 'vue';
  import { getQueryParam } from '../utils.ts';
  // 导入文章数据
  import { data as articleData } from '../article.data.ts';

  // 初始化标签数据
  const tags = computed(() => initTags(articleData));

  /**
   * 初始化标签数据
   * {tag1: [article1, article2, ...}
   */
  function initTags(articles) {
    const tags: Record<string, any[]> = {};
    
    // 使用 forEach 遍历文章数组
    articles.forEach(article => {
      const articleTags = Array.isArray(article.tags) ? article.tags : [];
      
      // 为每个标签添加文章
      articleTags.forEach(tag => {
        tags[tag] = tags[tag] || [];
        tags[tag].push(article);
      });
    });
    
    // 对所有标签下的文章进行一次性排序
    Object.keys(tags).forEach(tag => {
      tags[tag].sort((a, b) => b.date?.localeCompare(a.date) || 0);
    });
    return tags;
  }

  // 点击指定Tag后进行选中
  const selectTag = ref('');
  const toggleTag = (tagTitle: string) => {
    if (selectTag.value && selectTag.value === tagTitle) {
      selectTag.value = '';
    } else {
      selectTag.value = tagTitle;
    }
  }

  // 如果URL路径有tag参数, 默认选中指定Tag, 例如: /tags?tag=Git
  onMounted(() => {
    const tag = getQueryParam('tag');
    if (tag && tag.trim() !== '') {
      toggleTag(tag);
    }
  });
</script>

<style scoped>
.tag-list {
  margin-bottom: 20px;
  display: flex;
  flex-wrap: wrap;
}

.tag-item {
  display: inline-block;
  padding: 4px 16px;
  margin: 6px 8px;
  font-size: .875rem;
  line-height: 25px;
  border: 1px solid var(--vp-input-border-color);
  background-color: var(--vp-input-switch-bg-color);
  transition: .4s;
  border-radius: 2px;
  color: var(--vp-c-text-1);
  cursor: pointer;
}
.tag-item span {
  color: var(--vp-c-brand);
}

.tag-item-selected {
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-brand-light);
}

.tag-count {
  border-color: var(--vp-c-brand);
  font-weight: 700;
}

.article-list {
  border-radius: 4px;
}
li{
  list-style: none;
  margin: 0;
  padding: 0;
}

.article-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 15px;
  color: var(--vp-c-text-1);
  line-height: 1.75rem;
  border-radius: .25rem;
  transition: .4s;
}
.article-item:hover{
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-brand);
}

.article-item:last-child {
  border-bottom: none;
}

.article-item-title{
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  line-clamp: 1;
  overflow: hidden;
  text-overflow: ellipsis;
}

.article-item-title::before{
  display: inline-block;
    content: "";
    margin: 0 10px 2px 0;
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background-color: var(--vp-c-text-1);
    transition: .4s;
}

.article-item-date{
  flex-shrink: 0;
}

</style>