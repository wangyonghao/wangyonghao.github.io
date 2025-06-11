---
layout: doc
layoutClass: m-nav-layout
sidebar: false
comment: false
prev: false
next: false
---

<style src="/.vitepress/theme/style/nav.css"></style>

<script setup>
import { NAV_DATA } from '/.vitepress/theme/nav-data'
</script>


# 技术站点导航
<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>