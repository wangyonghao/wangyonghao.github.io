<script setup lang="ts">
import { onMounted, ref } from 'vue'

const showLoading = ref(true);
const props = defineProps({
    url: String
});
onMounted(async () => {
    const { XMindEmbedViewer } = await import("xmind-embed-viewer");
    const viewer = new XMindEmbedViewer({
        el: '#XmindViewer',
        region: 'cn'
    });
    viewer.setStyles({
        width: '100%',
        height: '100%'
    });
    const callback = () => {
        showLoading.value = false;
        viewer.removeEventListener('map-ready', callback);
    }
    viewer.addEventListener('map-ready', callback);
    fetch(props.url as string)
        .then(res => res.arrayBuffer()).then(file => {
            viewer.load(file);
        }).catch(err => {
            showLoading.value = false;
            console.error('加载xmind文件出错');
            viewer.removeEventListener('map-ready', callback);
        });
});
</script>

<template>
    <div id="XmindViewer">
        <div class="loading" v-if="showLoading"></div>
    </div>
</template>

<style scoped>
#XmindViewer {
    display: flex;
    height: 80vh;
    align-items: center;
    justify-content: center;
}
</style>