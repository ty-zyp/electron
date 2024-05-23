import { defineStore } from 'pinia';
import store from 'store2';
import _ from 'lodash';
const useWebsiteStore = defineStore('websiteStore',{
  state () {
    return {
      websites:[]
    }
  },
  getters:{
    find(){
      return (keywords) => { 
        if (!keywords) {
          return this.websites;
        }
        return this.websites.filter((item) => {
          return item.url.indexOf(keywords)>-1 || item.title.indexOf(keywords)>-1
        })
      }
    }
  },
  actions: { 
    init () {
      this.websites = store.get('websites');
    },
    add (item) {
      // if (_.find(this.websites, { url:item.url })){
      //   alert('此网站已经收藏')
      //   return
      // }
      const o = this.websites.find((obj) => {
        return item.title === obj.title
      });
      if (o){
        alert('此网站已经收藏')
      } else {
        this.websites.unshift(item)
        store.set('websites', this.websites);
      }

    },
    del (url) {
      const i = _.findIndex(this.websites, { url });
      this.websites.splice(i,1)
      // console.log(url)
      // this.websites = _.dropWhile(this.websites, { url });
      // console.log(this.websites)
      store.set('websites', this.websites);
    }
  }
})

export default useWebsiteStore;