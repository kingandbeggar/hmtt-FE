<template>
  <div class="item">
    <!-- 顶部 -->
    <van-nav-bar fixed :border="false">
      <template #left>
        <img src="@/assets/1.png" class="logo" />
      </template>
      <template #right>
        <van-icon name="search" size="18" color="#fff" />
      </template>
    </van-nav-bar>
    <!-- 滚动栏 -->
    <div class="tabss">
      <van-tabs v-model="active" @change="tabschaneg" animated :sticky="true" offset-top="1.22667rem">
        <van-tab :title="c.name" v-for="c in channels" :key="c.id">
          <!-- ArticleList -->
          <ArticleList :active="active"/>
        </van-tab>
      </van-tabs>
      <div class="right"><van-icon name="plus" /></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  created () {
    this.getchannels()
  },
  methods: {
    // 滚动频道
    async getchannels () {
      try {
        const {
          data: { data: res }
        } = await this.$API.home.getuserchanels()
        this.channels = res.channels
      } catch (error) {
        this.$toast('获取用户信息失败')
      }
    },
    tabschaneg (name, title) {
      console.log(name, title)
    }

  }
}
</script>

<style lang="less" scoped>
.logo {
  width: 30px;
  height: 30px;
}
/deep/.van-tab__pane {
  padding: 0 16px;
  padding-top: 10px;
}
.item {
  padding-top: 46px;
  padding-bottom: 50px;
}
.tabss {
  position: relative;
}
.right {
  position: fixed;
  right: 0;
  top: 46px;
  width: 44px;
  height: 44px;
  background-color: #fff;
  text-align: center;
  line-height: 44px;
}
/deep/.van-tabs__wrap {
  padding-right: 44px;
}
</style>
