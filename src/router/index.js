import Vue from 'vue'
import VueRouter from 'vue-router'
import { gettoken } from '@/utils/token'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/layout/home'
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
        meta: { records: true, top: null },
        component: () => import(/* webpackChunkName: "login" */ '@/views/Layout/Home')
      },
      {
        path: 'user',
        name: 'User',
        component: () => import(/* webpackChunkName: "login" */ '@/views/Layout/User'),
        beforeEnter (to, from, next) {
          if (gettoken()) {
            next()
          } else {
            next('/login')
          }
        }
      },
      {
        path: 'category',
        name: 'Category',
        component: () => import(/* webpackChunkName: "login" */ '@/views/Layout/Category')
      },
      {
        path: 'info',
        name: 'Info',
        component: () => import(/* webpackChunkName: "login" */ '@/views/Layout/Info')
      }
    ]
  },
  {
    path: '/search',
    name: 'Search',
    component: () => import(/* webpackChunkName: "search" */ '@/views/Search')
  },
  {
    path: '/searchresult/:kw',
    name: 'SearchResult',
    component: () => import(/* webpackChunkName: "search" */ '@/views/Search/SearchResult')
  },
  {
    path: '/articledetail/:artid',
    name: 'ArticleDetail',
    component: () => import(/* webpackChunkName: "article" */ '@/views/ArticleDetail')
  },
  {
    path: '/useredit',
    name: 'UserEdit',
    component: () => import(/* webpackChunkName: "user" */ '@/views/Layout/User/UserEdit')
  },
  {
    path: '/chat',
    name: 'Chat',
    component: () => import(/* webpackChunkName: "user" */ '@/views/Layout/User/Chat')
  }

]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (gettoken()) {
    console.log(to.path)
    if (to.path.includes('login')) {
      next('/')
    } else {
      next()
    }
    next()
  } else {
    if (to.path.includes('useredit') || to.path.includes('chat')) {
      next('/login')
    }
    next()
  }
})
router.afterEach((to, from, next) => {
  console.log(1)
  if (to.meta.records) {
    setTimeout(() => {
      document.documentElement.scrollTop = to.meta.top
    }, 0)
  }
})

export default router
