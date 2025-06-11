<script setup lang="ts">
import { computed } from 'vue'
import MNavLink from './MNavLink.vue'
import type { NavLink } from './types'

const props = defineProps<{
  title: string
  noIcon?: boolean
  items: NavLink[]
}>()

const formatTitle = computed(() => {
  return slugify(props.title)
})

/**
 * 将给定的字符串转换为一个唯一的标识符（slug），用于在 URL 中标识页面或资源。
 */
function slugify(text: string): string {
  return text
    .toString()
    .normalize('NFD') // 分解 unicode 字符，如 `é` -> `e´`
    .replace(/[\u0300-\u036f]/g, '') // 移除组合标记（如重音符号）
    .toLowerCase() // 转换为小写
    .trim() // 移除首尾空白
    .replace(/\s+/g, '-') // 将空格替换为连字符
    .replace(/[^\w-]+/g, '') // 移除所有非单词字符（字母、数字、下划线）和非连字符
    .replace(/--+/g, '-') // 替换多个连字符为单个连字符
}

</script>

<template>
  <h2 v-if="title" :id="formatTitle" tabindex="-1">
    {{ title }}
    <a class="header-anchor" :href="`#${formatTitle}`" aria-hidden="true"></a>
  </h2>
  <div class="m-nav-links">
    <MNavLink v-for="item in items" :noIcon="noIcon" v-bind="item" />
  </div>
</template>

<style scoped>
.m-nav-links {
  --m-nav-gap: 18px;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
  grid-row-gap: var(--m-nav-gap);
  grid-column-gap: var(--m-nav-gap);
  grid-auto-flow: row dense;
  justify-content: center;
  margin-top: var(--m-nav-gap);
}

@media (min-width: 500px) {
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }
}

@media (min-width: 640px) {
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
  }
}

@media (min-width: 768px) {
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(175px, 1fr));
  }
}

@media (min-width: 960px) {
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  }
}

@media (min-width: 1440px) {
  .m-nav-links {
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  }
}

@media (min-width: 960px) {
  .m-nav-links {
    --m-nav-gap: 20px;
  }
}
</style>