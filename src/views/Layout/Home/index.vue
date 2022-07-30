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
      <van-tabs v-model="active" @change="tabschaneg" animated swipeable :sticky="true" offset-top="1.22667rem">
        <van-tab :title="c.name" v-for="c in channels" :key="c.id">
          <!-- ArticleList -->
          <ArticleList :active="active"/>
        </van-tab>
      </van-tabs>
      <div class="right"><van-icon name="plus" @click="plusclick"/></div>
    </div>
    <!-- 添加频道 -->
      <van-popup v-model="show" get-container="body" class="pop">
        <channelEdit v-model="show" :channels="channels" @changechannel="changechannel" @changec="changec"/>
      </van-popup>
  </div>
</template>

<script>
import { Toast } from 'vant'
import channelEdit from './channelEdit'
export default {
  name: 'Home',
  components: { channelEdit },
  data () {
    return {
      active: 0,
      channels: [],
      show: false,
      new: []
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
    },
    plusclick () {
      this.show = true
    },
    changec (index) {
      this.active = index
    },
    // 添加删除频道
    async changechannel (li) {
      console.log(li)
      this.new = this.channels.map((item, index) => {
        const arr = { ...item }
        arr.seq = index
        delete arr.name
        return arr
      })
      const index = this.channels.findIndex((item, index) => item === li)
      if (index === -1) {
        this.new.push({ id: li.id, seq: this.new.length - 1 })
      } else {
        this.new.splice(index, 1)
      }
      try {
        const res = await this.$API.home.setchannels({ channels: this.new })
        console.log(res)
        if (index === -1) {
          this.channels.push(li)
          Toast('添加成功')
        } else {
          this.channels.splice(index, 1)
          Toast('删除成功')
        }
      } catch (error) {
        Toast('失败')
      }
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
  z-index: 1000;
}
/deep/.van-tabs__wrap {
  padding-right: 44px;
}
.pop {
  width: 100vw;
  height: 100vh;
}
</style>
