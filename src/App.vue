<script setup>
import { ref, provide,onMounted } from 'vue';
import Header from './views/Header.vue';
const isShow = ref(false);
const setIsShow = (val) => {
  isShow.value = val;
}
provide('dialog-visible', {
  isShow,
  setIsShow
})

onMounted(async () => {
  console.log('11')
  myApi.openDialog();
  await myApi.onRendererEvent(() => {
    console.log('17')
    isShow.value = true;
  });
})

const keywords = ref('');
const setKeywords = (val) => {
  keywords.value = val;
}
provide('searchBar-keywords', {
  keywords,
  setKeywords
})
</script>

<template>
  <Header></Header>
  <router-view></router-view>
</template>

<style scoped lang="scss">
</style>
