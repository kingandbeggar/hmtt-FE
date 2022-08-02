import request from '@/utils/request'

// 搜索联想建议
export const getsuggestion = (value) => request({
  url: '/v1_0/suggestion',
  params: { q: value }
})
// 搜索结果
export const getresult = (value, page = 1, per_page = 10) => request({
  url: '/v1_0/search',
  params: {
    q: value,
    page,
    per_page
  }
})
