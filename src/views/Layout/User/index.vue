<template>
  <div>
    <div class="top">
      <van-cell center :border="false">
        <!-- 使用 right-icon 插槽来自定义右侧图标 -->
        <template #title>
          <span>{{userinfo.name}}</span>
        </template>
        <template #label>
          <van-tag plain type="warning">申请认证</van-tag>
        </template>
        <template #icon>
          <van-image
            style="margin-right: 0.3rem"
            round
            width="1.5rem"
            height="1.5rem"
            :src="photo ||userinfo.photo"
          />
        </template>
      </van-cell>
      <div class="info">
        <div class="item">
          <span>{{userinfo.art_count}}</span>
          <span>动态</span>
        </div>
        <div class="item">
          <span>{{userinfo.follow_count}}</span>
          <span>关注</span>
        </div>
        <div class="item">
          <span>{{userinfo.fans_count}}</span>
          <span>粉丝</span>
        </div>
      </div>
    </div>
    <div class="bottom">
      <van-cell title="编辑资料" is-link icon="orders-o" to="/useredit" />
      <van-cell title="小思同学" is-link icon="smile-comment-o" to="/chat" />
      <van-cell title="退出登录" is-link icon="warn-o" @click="loginout" />
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { mapActions, mapState } from 'vuex'
export default {
  name: 'User',
  data () {
    return {
    }
  },

  methods: {
    loginout () {
      Dialog.confirm({
        title: '退出',
        message: '确认退出吗？'
      })
        .then(() => {
          // on confirm
          localStorage.clear()
          this.$router.replace('/login')
        })
        .catch(() => {
          // on cancel
        })
    },
    ...mapActions('user', { getuserinfo: 'getuserinfo' })

  },
  mounted () {
    this.getuserinfo()
  },
  computed: {
    ...mapState('user', ['userinfo', 'photo'])
  }
}
</script>

<style scoped lang="less">
.top {
  width: 100vw;
  // height: 150px;
  background-color: #8fbc8f;
  overflow: hidden;
  .van-cell {
    margin-top: 10px;
    background-color: transparent;
    color: aliceblue;
  }
  .info {
    display: flex;
    justify-content: space-evenly;
    margin: 30px 0;
    font-size: 15px;
    color: white;
    .item {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
  }
}
</style>
