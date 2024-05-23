import useWebsiteStore from '@/store/websiteStore';
import { onMounted,inject,computed } from 'vue';

const useWebsite = () => {
  const { keywords } = inject('searchBar-keywords')
  const websiteStore = useWebsiteStore();
  onMounted(() => {
    websiteStore.init()
  })

  // const searchData = computed(() => {
  //   console.log('ssss:',keywords)
  //   return websiteStore.websites.filter((item) => {
  //     return item.url.indexOf(keywords) 
  //   })
  // })

  return { websiteStore,keywords }
}

export default useWebsite;