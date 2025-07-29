<template>
  <div class="archive-container">
    <!-- 筛选器 -->
    <div class="filter-container">
      <div class="filter-item" v-if="tagsList.length > 0">
        <span class="filter-label">标签筛选：</span>
        <div class="filter-tags">
          <button
            v-for="tag in tagsList"
            :key="tag"
            @click="filterByTag(tag)"
            :class="[selectedTag === tag ? 'tag-active' : '']"
            class="filter-tag"
          >
            {{ tag }}
          </button>
        </div>
      </div>
      <div class="filter-item" v-if="yearsList.length > 0">
        <span class="filter-label">年份筛选：</span>
        <div class="filter-years">
          <button
            v-for="year in yearsList"
            :key="year"
            @click="filterByYear(year)"
            :class="[selectedYear === year ? 'year-active' : '']"
            class="filter-year"
          >
            {{year }}
          </button>
        </div>
      </div>
    </div>

    <!-- 时间轴主体 -->
    <div class="timeline-wrap">
      <div v-for="(yearData, year) in archiveData" :key="year" class="timeline-item">
        <div class="year-header">
          <span class="year-text">{{ year }}</span>
          <span class="year-count">({{ yearData.length }}篇)</span>
        </div>
        <div class="articles-container">
          <div v-for="(article, index) in yearData" :key="index" class="article-item">
            <div class="article-title-wrap">
              <div class="article-title">
                <a :href="article.url">{{ article.title }}</a>
              </div>
              <div class="article-tags-inline" v-if="article.tags && article.tags.length">
                <span
                  v-for="tag in article.tags"
                  :key="tag"
                  class="article-tag-inline"
                  @click="filterByTag(tag)"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
            <div class="article-date">{{ formatArticleDate(article.date) }}</div>
          </div>
        </div>
      </div>
      <!-- 无数据提示 -->
      <div v-if="Object.keys(archiveData).length === 0" class="no-data">
        暂无符合条件的文章
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import { getQueryParam } from '../utils';
import { data as articleData } from '../article.data';
import { useRoute, useRouter } from 'vitepress';

const archiveData = ref({});
const selectedTag = ref('');
const selectedYear = ref();
const route = useRoute();
const router = useRouter();

// 计算所有标签列表
const tagsList = computed(() => {
  const tags = new Set();
  articleData.forEach(article => {
    if (article.tags && Array.isArray(article.tags)) {
      article.tags.forEach(tag => tags.add(tag));
    }
  });
  return Array.from(tags);
});

// 计算所有年份列表
const yearsList = computed(() => {
  const years = new Set();
  articleData.forEach(article => {
    if (article.date) {
      years.add(new Date(article.date).getFullYear()+'');
    }
  });
  return Array.from(years).sort((a, b) => parseInt(b) - parseInt(a));
});

function formatArticleDate(dateStr) {
  if (!dateStr) return '';
  const dateParts = dateStr.split('-');
  if (dateParts.length >= 2) {
    return `${dateParts[1]}-${dateParts[2] || '01'}`;
  }
  return dateStr;
}

function filterByTag(tag) {
  if (selectedTag.value === tag) {
    selectedTag.value = '';
    updateQuery();
  } else {
    selectedTag.value = tag;
    updateQuery();
  }
}
function filterByYear(year) {
  if (selectedYear.value === year) {
    selectedYear.value = '';
    updateQuery();
  } else {
    selectedYear.value = year;
    updateQuery();
  }
}
function updateQuery() {
  let query = '';
  if (selectedTag.value) query += `tag=${encodeURIComponent(selectedTag.value)}`;
  if (selectedYear.value) {
    if (query) query += '&';
    query += `year=${encodeURIComponent(selectedYear.value)}`;
  }
  router.go(`${route.path}${query ? '?' + query : ''}`);
}

function initTimeline() {
  let filteredArticles = [...articleData];
  const $tag = getQueryParam('tag');
  const $year = getQueryParam('year');
  if ($tag && $tag.trim() !== '') selectedTag.value = $tag;
  else selectedTag.value = '';
  if ($year && $year.trim() !== '') selectedYear.value = $year;
  else selectedYear.value = '';
  if (selectedTag.value) {
    filteredArticles = filteredArticles.filter(article => article.tags && article.tags.includes(selectedTag.value));
  }
  if (selectedYear.value) {
    filteredArticles = filteredArticles.filter(article => article.date && new Date(article.date).getFullYear()+'' === selectedYear.value);
  }
  filteredArticles.sort((a, b) => {
    if (!a.date) return 1;
    if (!b.date) return -1;
    return b.date.localeCompare(a.date);
  });
  const result = {};
  filteredArticles.forEach(article => {
    if (article.date) {
      const year = new Date(article.date).getFullYear();
      if (!result[year]) result[year] = [];
      result[year].push(article);
    }
  });
  const sortedResult = {};
  Object.keys(result)
    .sort((a, b) => parseInt(b) - parseInt(a))
    .forEach(year => {
      sortedResult[year] = result[year];
    });
  archiveData.value = sortedResult;
}

watch(() => route.fullPath, () => {
  initTimeline();
});
onMounted(() => {
  initTimeline();
});
</script>

<style scoped>
.archive-container {
  margin: 0 auto;
  padding: 16px 32px 0px 32px;
}
.filter-container {
  margin-bottom: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 18px;
}
.filter-item {
  display: flex;
  align-items: center;
  gap: 8px;
}
.filter-label {
  font-size: 14px;
  margin-right: 6px;
  color: var(--vp-c-text-1);
}
.filter-tags, .filter-years {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}
.filter-tag, .filter-year {
  padding: 2px 12px;
  border-radius: 2px;
  cursor: pointer;
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  transition: all 0.2s;
}
.filter-tag:hover, .filter-year:hover {
  color: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
}
.tag-active, .year-active {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-brand);
  border-color: var(--vp-c-brand);
  font-weight: 600;
}
.timeline-wrap {
  margin-top: 18px;
}
.year-header {
  display: flex;
  align-items: baseline;
  color: var(--vp-c-text-1);
  margin: 8px 0 8px 0;
  padding: 0;
}
.year-text {
  font-weight: 500;
  color: var(--vp-c-text-1);
}
.year-count {
  font-size: 15px;
  color: var(--vp-c-text-2);
  margin-left: 8px;
  font-weight: 400;
}
.articles-container {
  padding-left: 0;
}
.article-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px 1em;
  line-height: 1.75rem;
  background: none;
  transition: background 0.2s;
  margin-bottom: 8px;
  margin-top: 0;
  position: relative;
}
.article-item:hover {
  background-color: var(--vp-c-bg-soft);
  color: var(--vp-c-brand);
}
.article-title-wrap {
  display: flex;
  align-items: center;
  flex: 1 1 auto;
  min-width: 0;
}
.article-title {
  font-size: 16px;
  font-weight: 400;
  color: var(--vp-c-text-1);
  margin: 0;
  line-height: 1.6;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 320px;
}
.article-title a {
  color: inherit;
  text-decoration: none;
}
.article-title a:hover {
  color: var(--vp-c-brand);
}
.article-tags-inline {
  display: flex;
  gap: 4px;
  margin-left: 10px;
}
.article-tag-inline {
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-2);
  border-radius: 2px;
  font-size: 13px;
  padding: 1px 8px;
  cursor: pointer;
  transition: background 0.2s;
}
.article-tag-inline:hover {
  background: var(--vp-c-bg);
  color: var(--vp-c-brand);
}
.article-date {
  flex: 0 0 auto;
  font-size: 15px;
  color: var(--vp-c-text-2);
  margin-left: 16px;
  min-width: 56px;
  text-align: right;
}
.no-data {
  padding: 40px 0;
  text-align: center;
  color: var(--vp-c-text-2);
  font-size: 16px;
}
@media (max-width: 768px) {
  .archive-container {
    padding: 10px;
  }
  .year-header {
    font-size: 18px;
  }
  .year-text {
    font-size: 18px;
  }
  .article-item {
    font-size: 15px;
    min-height: 32px;
  }
  .article-date {
    font-size: 14px;
    min-width: 48px;
  }
  .article-title {
    max-width: 120px;
  }
}
</style>