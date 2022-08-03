<template>
  <div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <van-tabbar v-model="active" :safe-area-inset-bottom="true">
      <van-tabbar-item to="/layout/home" icon="wap-home-o"
        >首页</van-tabbar-item
      >
      <van-tabbar-item to="/layout/category" icon="apps-o"
        >分类</van-tabbar-item
      >
      <van-tabbar-item to="/layout/info" icon="chat-o">信息</van-tabbar-item>
      <van-tabbar-item to="/layout/user" icon="user-circle-o"
        >我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data () {
    return {
      active: 0
    }
  },
  activated () {
    console.log('我被激活了')
    // 处理退出登录后tabbar图标active错误的问题
    this.active = 0
  }
}
</script>

<style  lang="less" scoped>
</style>
