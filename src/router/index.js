import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    directive: '/layout/home'
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '@/views/Login')
  },
  {
    path: '/layout',
    name: 'Layout',
    component: () => import(/* webpackChunkName: "layout" */ '@/views/Layout'),
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import(/* webpackChunkName: "login" */ '@/views/Layout/Home')
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "login" */ '@/views/Layout/User')
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

export default router
