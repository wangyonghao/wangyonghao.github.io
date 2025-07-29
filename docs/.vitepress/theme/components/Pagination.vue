<template>
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="changePage(currentPage - 1)">上一页</button>
      <span>第 {{ currentPage }} / {{ totalPages }} 页</span>
      <button :disabled="currentPage === totalPages" @click="changePage(currentPage + 1)">下一页</button>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    total: Number,
    pageSize: Number,
    currentPage: Number
  })
  const emit = defineEmits(['update:currentPage'])
  
  const totalPages = computed(() => Math.ceil(props.total / props.pageSize))
  
  function changePage(page) {
    if (page >= 1 && page <= totalPages.value) {
      emit('update:currentPage', page)
    }
  }
  </script>
  
  <style scoped>
  .pagination { display: flex; gap: 1em; align-items: center; justify-content: center; margin-top: 2em; }
  button:disabled { opacity: 0.5; cursor: not-allowed; }
  </style>