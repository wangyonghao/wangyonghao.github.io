<template>
  <ClientOnly>
    <Layout>
      <template #doc-footer-before>
        <Copyright
          v-if="(frontmatter?.aside ?? true) && (frontmatter?.metadata ?? true) && !(frontmatter.authorLink)"
          :key="page.relativePath" />
      </template>
      <template #layout-bottom>
        <Footer v-if="!hasSidebar && (theme.footerConfig?.showFooter ?? true) && (frontmatter?.showFooter ?? true)" />
      </template>
    </Layout>
  </ClientOnly>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import DefaultTheme from 'vitepress/theme';
  import { useData } from 'vitepress';
  // import md5 from 'blueimp-md5';
  import Copyright from './layout/Copyright.vue';
  import Footer from './layout/Footer.vue';

  const { Layout } = DefaultTheme;
  const { page, theme, frontmatter } = useData();
  const hasSidebar = computed(() => {
    return (
      frontmatter.value.aside !== false && frontmatter.value.layout !== 'home'
    )
  });
</script>

<style scoped></style>