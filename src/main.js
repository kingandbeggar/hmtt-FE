import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 引入全局vant
import Vant from 'vant'
import 'vant/lib/index.css'
// 引入基准字号
import 'amfe-flexible'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
