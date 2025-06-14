---
layout: doc
layoutClass: m-nav-layout
sidebar: false
comment: false
prev: false
next: false
---

<style src="./index.css"></style>

<script setup>
import { NAV_DATA } from './data'
</script>


# 技术站点导航
<MNavLinks v-for="{title, items} in NAV_DATA" :title="title" :items="items"/>