import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ArticleList from '@/components/ArticleList'
// 引入vant
import './vantComponents'
import api from '@/api'
// 引入基准字号
import 'amfe-flexible'
Vue.component('ArticleList', ArticleList)
Vue.config.productionTip = false
Vue.prototype.$API = api
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
