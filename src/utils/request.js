import axios from 'axios'
import { gettoken, settoken, deltoken } from '@/utils/token'
import { refreshtoken } from '@/api/Login'
import router from '@/router/index'
import { Toast } from 'vant'
const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  timeout: '20000'
})

// 添加请求拦截器
request.interceptors.request.use(function (config) {
  // console.log(config)
  // 在发送请求之前做些什么
  if (gettoken() && !config.headers.Authorization) {
    config.headers.Authorization = `Bearer ${gettoken()}`
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么

  return response
}, async function (error) {
  // 对响应错误做点什么
  console.dir(error)
  if (error.response.status === 401) {
    deltoken()
    // 如果检测到没有token就跳到login
    // if (!gettoken()) {
    //   setTimeout(() => {
    //     Toast('请您登录')
    //   }, 0)
    //   router.replace(`/login?path=${router.currentRoute.fullPath}`)
    //   return
    // }

    try {
      // 这一步会重新触发响应拦截器
      const res = await refreshtoken()
      settoken(res.data.data.token)
      // error.config里的请求头是旧的请求头，请求拦截器检测到有请求头所以就不设置最新的了，所以要手动设置否则会无限循环
      error.config.headers.Authorization = `Bearer ${gettoken()}`
      // 发起token失效前最后一期请求
      return request(error.config)
    } catch (error) {
      console.log(error)
    }
  } else if (error.response.status === 500 && error.config.url === '/v1_0/authorizations' && error.config.method === 'put') {
    localStorage.clear()
    setTimeout(() => {
      Toast('登陆信息失效，即将为您跳转登录页')
    }, 0)
    setTimeout(() => {
      router.replace(`/login?path=${router.currentRoute.fullPath}`)
    }, 2000)
  }
  return Promise.reject(error)
})

export default ({ url, method = 'get', data = {}, params = {}, headers = {} }) => {
  return request({
    url,
    method,
    data,
    params,
    headers
  })
}
