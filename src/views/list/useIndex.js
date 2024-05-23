import { ref } from 'vue'
const currentIndex = ref(0);
const handleItemClick = (i,url) => {
  currentIndex.value = i;
  // window.open(url,'_blank','width=1300,height=800')
  myApi.open(url)
}
const useIndex = () => {
  return {handleItemClick,currentIndex}
}
export default useIndex