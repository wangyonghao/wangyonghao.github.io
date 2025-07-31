<template>
  <div class="article-list">
    <div v-for="article in pagedArticles" :key="article.url" class="article-item">
      <div class="article-header">
        <a :href="article.url" class="article-title">
          <span v-if="article.top" class="article-top">【置顶】</span>
          {{ article.title }}
        </a>
      </div>
      <p v-if="article.description" class="article-desc">{{ article.description }}</p>
      <div class="meta-row">
        <span class="meta-date">
          <svg class="icon-clock" viewBox="0 0 16 16" width="1em" height="1em" style="vertical-align:middle;margin-right:2px;"><circle cx="8" cy="8" r="7" stroke="currentColor" stroke-width="1.5" fill="none"/><path d="M8 4v4l2.5 2.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" fill="none"/></svg>
          {{ article.date }}
        </span>
        <template v-if="article.tags && article.tags.length">
          <span class="meta-tags">
            <span v-for="tag in article.tags" :key="tag" class="tag">{{ tag }}</span>
          </span>
        </template>
      </div>
      <div class="divider"></div>
    </div>
    <Pagination
      :total="articles.length"
      :page-size="pageSize"
      v-model:current-page="currentPage"
    />
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import {data as articles} from '../article.data';
import Pagination from './Pagination.vue'

const props = defineProps({
  pageSize: Number
})

const currentPage = ref(1)
const pageSize = props.pageSize || 10

const sortedArticles = computed(() => {
  if (!articles || !Array.isArray(articles)) {
    console.warn('articles 不是一个数组:', articles);
    return [];
  }
  return articles.sort((a, b) => new Date(b.date) - new Date(a.date))
})

const pagedArticles = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return sortedArticles.value.slice(start, start + pageSize)
})

</script>

<style scoped>
.article-list {
  max-width: 100%;
}

.article-item {
  padding: 18px 0 10px 0;
}

.article-header {
  font-size: 1.125rem;
  font-weight: 500;
  margin-bottom: 8px;
}

.article-title {
  font-size: 1.125em;
  font-weight: 500;
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.article-title:hover {
  color: var(--vp-c-brand-1);
}

.article-top {
  color: #e53935;
  font-weight: bold;
  margin-right: 4px;
}

.article-desc {
  color: var(--vp-c-text-2);
  font-size: 1em;
  margin: 4px 0 6px 0;
  line-height: 1.6;
  display: -webkit-box;
  line-clamp: 2;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.meta-row {
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 0 0 0.5em 0;
}

.meta-date {
  display: flex;
  align-items: center;
  color: #bdbdbd;
  font-size: 0.92em;
}

.meta-tags {
  display: flex;
  gap: 6px;
}

.tag {
  background: #f2f3f5;
  color: #888;
  border-radius: 8px;
  padding: 2px 10px;
  font-size: 0.92em;
  margin-right: 0;
}

.divider {
  border-bottom: 1px solid #ececec;
  margin: 12px 0 0 0;
}

.icon-clock {
  color: #bdbdbd;
}
</style>