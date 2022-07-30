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
// 所有频道

// 设置频道

// 文章不喜欢

// 文章举报
