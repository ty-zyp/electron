<script setup >
import { Teleport, ref ,onMounted} from 'vue';
import SearchBar from './SearchBar.vue'
import Dialog from './Dialog.vue'
import List from './List.vue'


</script>

<template>
  <!-- <div>contents</div> -->
  <SearchBar></SearchBar>
  <Teleport to="body">
    <Dialog></Dialog>
  </Teleport>
  <List></List>
</template>

<style scoped lang="scss">
</style>
