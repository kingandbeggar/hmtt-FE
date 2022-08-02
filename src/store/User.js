import { getuserinfo } from '@/api/User'
export default {
  namespaced: true,
  state: {
    userinfo: {},
    photo: ''
  },
  getters: {
  },
  mutations: {
    GETUSERINFO (state, data) {
      state.userinfo = data
    },
    CHANGEPHOTO (state, data) {
      state.photo = data
    },
    CHANGEUSERNAME (state, data) {
      state.userinfo.name = data
    }
  },
  actions: {
    async getuserinfo ({ commit }) {
      try {
        const res = await getuserinfo()

        if (res.status === 200) {
          // this.user = res.data.data
          commit('GETUSERINFO', res.data.data)
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}
