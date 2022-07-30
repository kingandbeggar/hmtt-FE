import request from '@/utils/request'
// import { gettoken } from '@/utils/cookie'
// 用户频道
export const getuserchanels = () => request({
  url: '/v1_0/user/channels'
})
// 文章列表
export const getartlist = (channel_id, timestamp) => request({
  url: '/v1_0/articles',
  params: {
    channel_id,
    timestamp
  }
})
// 所有频道列表
export const getallchanels = () => request({
  url: '/v1_0/channels'
})
// 设置-频道列表
export const setchannels = (data) => request({
  url: '/v1_0/user/channels',
  method: 'put',
  data
})
// 文章不喜欢

// 文章举报
