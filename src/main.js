import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ArticleList from '@/components/ArticleList'
import 'highlight.js/styles/default.css' // 代码高亮的样式
import hljs from 'highlight.js'
// 引入vant
import './vantComponents'
import api from '@/api'
// 引入基准字号
import 'amfe-flexible'
import '@/utils/directive'

Vue.directive('highlight', function (el) { // 自定义一个代码高亮指令
  const highlight = el.querySelectorAll('pre, code') // 获取里面所有pre或者code标签
  highlight.forEach((block) => {
    hljs.highlightElement(block) // 突出显示这些标签(以及内部代码, 会自动识别语言)
  })
})

if (process.env.NODE_ENV !== 'development') {
  console.log = function () {}
  console.dir = function () {}
  console.error = function () {}
}
Vue.component('ArticleList', ArticleList)
Vue.config.productionTip = false
Vue.prototype.$API = api
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
