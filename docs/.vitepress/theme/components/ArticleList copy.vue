<template>
    <div>
      <div v-for="article in pagedArticles" :key="article.path" class="article-item">
        <h2>
          <a :href="article.path">{{ article.title }}</a>
        </h2>
        <div class="meta">
          <span>{{ article.date }}</span>
          <span v-if="article.tags">| {{ article.tags.join(', ') }}</span>
        </div>
        <p>{{ article.excerpt }}</p>
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
  
  const sortedArticles = computed(() =>
    [articles].sort((a, b) => new Date(b.date) - new Date(a.date))
  )
  
  const pagedArticles = computed(() => {
    const start = (currentPage.value - 1) * props.pageSize
    return sortedArticles.value.slice(start, start + props.pageSize)
  })
  </script>
  
  <style scoped>
  .article-item { margin-bottom: 2em; }
  .meta { color: var(--vp-c-text-2); font-size: 0.9em; margin-bottom: 0.5em; }
  </style>