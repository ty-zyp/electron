<script setup>
import { ref, onMounted } from 'vue'
const fileArr = ref([]);
onMounted(async () => {
  const result = await myApi.getFileList();
  fileArr.value = result;
})
</script>

<template>
  <div class="img-container">
    <img v-for="item in fileArr" :key="item" :src='`../../../uploads/${item}`'/>
  </div>
</template>

<style scoped lang="stylus">
.img-container
  padding 20px
  img
    width 100px
</style>
