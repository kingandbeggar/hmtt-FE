import request from '@/utils/request'
import { gettoken } from '@/utils/token'
// 登录
export const gologin = (data) => request({
  method: 'post',
  url: '/v1_0/authorizations',
  data
})

// 刷新token
export const refreshtoken = () => request({
  method: 'put',
  url: '/v1_0/authorizations',
  headers: {
    Authorization: `Bearer ${gettoken('refresh_token')}`
  }
})
