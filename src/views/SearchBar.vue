<script setup>
import { ref, inject } from 'vue'   
import _ from 'lodash'
const { isShow, setIsShow } = inject('dialog-visible');
const { keywords, setKeywords } = inject('searchBar-keywords');
const handlClick = () => {
  setIsShow(!isShow.value)
}

const search = _.debounce((e) => {
  setKeywords(e.target.value)
},500)
</script>

<template>
  <div class="search-container">
    <div class="button" @click="handlClick">+</div>
    <div class="input">
      <input type="text" placeholder="请输入关键字.." @keyup.enter="search" :value="keywords">
    </div>
  </div>
</template>

<style scoped lang="stylus">
div.search-container
  height 60px
  background #d3d3d3
  display flex
  align-items center
  justify-content center

  .button
    width 40px
    height 40px
    background-color #1e90ff
    padding-left 0
    border-radius 5px
    font-size 30px
    font-weight blod
    color #fff
    text-align:center
    cursor pointer
  .input
    flex 1
    height 36px
    padding 0 10px
    input
      height 100% 
      width 100%
      outline none
      border solid 1px #ccc
      border-radius 5px
      padding 0 10px


</style>
