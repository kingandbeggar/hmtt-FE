import request from '@/utils/request'

export const gologin = (data) => request({
  method: 'post',
  url: '/v1_0/authorizations',
  data
})
