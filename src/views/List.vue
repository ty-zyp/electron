<script setup>
// import { ref } from 'vue'
import useWebsite from './list/useWebsites';
import useIndex  from './list/useIndex';
const {websiteStore, keywords} = useWebsite()
const { handleItemClick, currentIndex } = useIndex();
const del = (url) => {
  websiteStore.del(url);
  currentIndex.value = currentIndex.value-1===0?currentIndex.value=0:currentIndex.value-1
}
</script>

<template>
  <div>
    <p id="no-item" v-if="websiteStore.find(keywords)?.length===0">暂无数据</p>
    <div id="items" v-else>
      <div class="read-item" v-for="(item,i) in websiteStore.find(keywords)" :key="item.url" :class="{selected:currentIndex===i}" @click="handleItemClick(i,item.url)">
        <img :src="item.screenshot" :alt="item.title">
        <h2>{{ item.title }}</h2>
        <button @click.stop="del(item.url)">X</button>
      </div>
  
    </div>
  </div>
</template>

<style scoped lang="stylus">
#no-item
  font-width blod
  color sliver
  text-align center
  width 100%
  position absolute
  top 100px
  z-index -1
#items
  .read-item
    display flex
    align-items center
    align-content center
    border-bottom lightgray 2px solid
    background #fafafa
    border-left 10px solid lightgray
    -webkit-user-select none
    position relative
    padding 10px
    img
      width 20%
      margin-right 25px
      border solid 1px #ccc
    &:hover
      background #eee
    &:hover button
      display:inline-block
    &.selected
      border-left-color dodgerblue
    button
      position absolute
      display none
      right 10px
      top 10px
      width 30px
      height 30px
      background #f44336
      border none
      border-radius 50%
      color white
      text-align center
      font-size 16px
      cursor pointer




</style>
