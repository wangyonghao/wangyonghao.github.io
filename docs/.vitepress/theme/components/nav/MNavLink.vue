<script setup lang="ts">
import { computed } from 'vue'
import { withBase } from 'vitepress'
import { NavLink } from './types'

const props = defineProps<{
  noIcon?: boolean
  icon?: NavLink['icon']
  badge?: NavLink['badge']
  title?: NavLink['title']
  desc?: NavLink['desc']
  link: NavLink['link']
}>()

const formatTitle = computed(() => {
  if (!props.title) {
    return ''
  }
  return slugify(props.title)
})

const svg = computed(() => {
  if (typeof props.icon === 'object') return props.icon.svg
  return ''
})

const formatBadge = computed(() => {
  if (typeof props.badge === 'string') {
    return { text: props.badge, type: 'info' }
  }
  return props.badge
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
  <a v-if="link" class="m-nav-link" :href="link" target="_blank" rel="noreferrer">
    <article class="box" :class="{ 'has-badge': formatBadge }">
      <div class="box-header">
        <template v-if="!noIcon">
          <div v-if="svg" class="icon" v-html="svg"/>
          <div v-else-if="icon && typeof icon === 'string'" class="icon">
            <img :src="withBase(icon)" :alt="title" onerror="this.parentElement.style.display='none'" />
          </div>
        </template>
        <h5 v-if="title" :id="formatTitle" class="title" :class="{ 'no-icon': noIcon }">{{ title }}</h5>
      </div>
      <Badge v-if="formatBadge" class="badge" :type="formatBadge.type" :text="formatBadge.text" />
      <p v-if="desc" class="desc">{{ desc }}</p>
    </article>
  </a>
</template>

<style scoped>
.m-nav-link {
  --m-nav-icon-box-size: 32px;
  --m-nav-icon-size: 28px;
  --m-nav-box-gap: 12px;

  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition: all 0.25s;
}

.m-nav-link:hover {
  box-shadow: var(--vp-shadow-2);
  border-color: var(--vp-c-brand);
  text-decoration: initial;
  background-color: var(--vp-c-bg-soft-up);
  transform: translateY(-5px);
}

.m-nav-link .box {
  display: flex;
  flex-direction: column;
  position: relative;
  padding: var(--m-nav-box-gap);
  height: 100%;
  color: var(--vp-c-text-1);
}

.m-nav-link .box .has-badge {
  padding-top: calc(var(--m-nav-box-gap) + 2px);
}

.m-nav-link .box-header {
  display: flex;
  align-items: center;
}

.m-nav-link .icon {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: calc(var(--m-nav-box-gap) - 2px);
  border-radius: 6px;
  width: var(--m-nav-icon-box-size);
  height: var(--m-nav-icon-box-size);
  font-size: var(--m-nav-icon-size);
  background-color: var(--vp-c-bg-soft-down);
  transition: background-color 0.25s;
}

.m-nav-link .icon svg {
  width: var(--m-nav-icon-size);
  fill: currentColor;
}

.m-nav-link .icon img {
  border-radius: 4px;
  width: var(--m-nav-icon-size);
}


.m-nav-link .title {
  overflow: hidden;
  flex-grow: 1;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: 16px;
  font-weight: 600;
}

.m-nav-link .badge {
  position: absolute;
  top: 2px;
  right: 0;
  transform: scale(0.8);
}

.m-nav-link .desc {
  overflow: hidden;
  text-overflow: ellipsis;
  flex-grow: 1;
  margin: calc(var(--m-nav-box-gap) - 2px) 0 0;
  line-height: 1.5;
  font-size: 12px;
  color: var(--vp-c-text-2);
}


@media (max-width: 960px) {
  .m-nav-link {
    --m-nav-icon-box-size: 60px;
    --m-nav-icon-size: 60px;
    --m-nav-box-gap: 15px
  }

  .m-nav-link .title {
    font-size: 16px
  }
}
</style>