<script setup>
import { ref, inject} from 'vue'
import useWebsiteStore from '@/store/websiteStore'

const websiteStore = useWebsiteStore();
const { isShow, setIsShow } = inject('dialog-visible');
const url = ref('');

const isQuery = ref(false);
const handleAdd = async () => {
  if (!url.value) {
    alert('请输入网址');
    return;
  }
  isQuery.value = true;
  const result = await myApi.sendUrl(url.value);
  if (result.errorUrl){
    alert('该网址不存在！')
    isQuery.value = false;
  } else {
    websiteStore.add(result);
    setIsShow(!isShow.value);
    isQuery.value = false;
    url.value = ''
  }

}
const handleCancel = () => {
  setIsShow(!isShow.value);
  url.value = ''
}

</script>

<template>
  <div class="dialog-wrap" v-if="isShow">
    <div class="content">
      <div class="input">
        <input type="text" placeholder="请输入网址。。。" v-model="url" :disabled="isQuery" @keyup.enter="handleAdd">
      </div>
      <div class="btns">
        <button @click="handleAdd" :disabled="isQuery">添加</button>
        <button @click="handleCancel" :disabled="isQuery">取消</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="stylus">
.dialog-wrap
  position absolute
  top 0
  left 0
  right 0
  bottom 0
  background rgba(0,0,0,0.8)
  display flex
  justify-content center
  align-items center
  z-index 1000
  .content
    width 100%
    padding 0 20px
    input 
      height 30px
      width 100%
      outline none
      margin-bottom 10px
      font-size 12px
    .btns
      button
        height 30px
        margin right 10px
        font-size 12px
        padding 0 20px

</style>
