import request from '@/utils/request'

// 文章详情
export const getarticle = (article_id) => request({
  url: `/v1_0/articles/${article_id}`
})

// 点赞
export const dianzan = (id) => request({
  url: '/v1_0/article/likings',
  data: {
    target: id
  },
  method: 'post'
})

// 取消点赞
export const canceldianzan = (id) => request({
  url: `/v1_0/article/likings/${id}`,
  method: 'DELETE'
})

// 文章评论列表
export const getcomments = (id, offset = null, type = 'a', limit = 10) => request({
  url: '/v1_0/comments',
  params: {
    type,
    source: id,
    offset,
    limit
  }
})

// 评论点赞
export const artdianzan = (id) => request({
  url: '/v1_0/comment/likings',
  data: {
    target: id
  },
  method: 'post'
})

// 评论取消点赞
export const artcanceldianzan = (id) => request({
  url: `/v1_0/comment/likings/${id}`,
  method: 'DELETE'
})
// 文章评论
export const addcomment = (target, content, art_id = null) => {
  const data = {
    target,
    content
  }
  if (art_id !== null) {
    data.art_id = art_id
  }
  return request({
    url: '/v1_0/comments',
    method: 'post',
    data
  })
}

// 取关
export const cancelfollow = (id) => request({
  url: `/v1_0/user/followings/${id}`,
  method: 'DELETE'
})

// 关注
export const follow = (id) => request({
  url: '/v1_0/user/followings',
  data: {
    target: id
  },
  method: 'post'
})

// 文章-举报
export const artreport = (id, type) => request({
  url: '/v1_0/article/reports',
  data: {
    target: id,
    type
  },
  method: 'post'
})
// 文章-不喜欢
export const artdislike = (id) => request({
  url: '/v1_0/article/dislikes',
  data: {
    target: id
  },
  method: 'post'
})
