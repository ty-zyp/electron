import { createApp } from 'vue'
import 'normalize.css'
import '@/assets/common.css'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from '@/router'

createApp(App).use(createPinia()).use(router).mount('#app')
