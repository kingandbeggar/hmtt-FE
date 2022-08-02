import request from '@/utils/request'
// 用户信息
export const getuserinfo = () => request({
  url: '/v1_0/user'
})

// 用户编辑信息
export const getuserinfo2 = () => request({
  url: '/v1_0/user/profile'
})

// 用户头像
export const changeacvatar = (data) => request({
  url: '/v1_0/user/photo',
  method: 'PATCH',
  data
})

// 更新简介
export const changeprofile = (value) => {
  const data = {
    name: '',
    gender: '',
    birthday: '',
    real_name: '',
    intro: ''
  }
  for (const d in data) {
    if (value[d] === undefined) {
      delete data[d]
    } else {
      data[d] = value[d]
    }
  }
  return request({
    url: '/v1_0/user/profile',
    method: 'PATCH',
    data
  })
}
