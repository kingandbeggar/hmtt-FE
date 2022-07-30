<template>
  <div>
    <!-- 顶部 -->
    <van-nav-bar title="频道管理" fixed :border="false">
      <template #right>
        <van-icon
          name="cross"
          size="18"
          color="#fff"
          @click="$emit('input', false)"
        />
      </template>
    </van-nav-bar>
    <div class="main">
      <!-- 我的频道 -->
      <div class="mychannels">
        <div class="top">
          <div class="left">
            <span>我的频道</span>
            <span>点击{{showx?'删除':'进入'}}频道</span>
          </div>
          <van-button type="info" size="mini" color="#ff6e7c" @click="changeshowx">{{showx?'完成':'编辑'}}</van-button>
        </div>
        <div class="bottom">
          <van-row type="flex" justify="left">
            <van-col span="5" class="col" v-for="c,index in channels" :key="c.id" @click="changechannel(c,index)"
              >{{ c.name }}
              <van-icon name="cross" class="crossicon" color="#111" size="3" v-show="showx&& c.name!=='推荐'"/>
            </van-col>
          </van-row>
        </div>
      </div>
      <!-- 添加更多频道 -->
      <div class="addmore">
        <span>点击添加更多频道:</span>
        <div class="bottom">
          <van-row type="flex" justify="left">
            <van-col
              span="5"
              class="col"
              v-for="c in lastchannel"
              :key="c.id"
              @click="changechannel(c)"
              >{{ c.name }}</van-col
            >
          </van-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'channelEdit',
  props: ['channels'],
  data () {
    return {
      allchannels: [],
      showx: false
    }
  },

  mounted () {
    this.getallchannels()
  },
  methods: {
    async getallchannels () {
      try {
        const {
          data: { data: res }
        } = await this.$API.home.getallchanels()
        console.log(res)
        this.allchannels = res.channels
      } catch (error) {
        this.$toast('获取失败')
      }
    },
    changeshowx () {
      this.showx = !this.showx
    },
    changechannel (li, index) {
      if (this.showx) {
        this.$emit('changechannel', li)
      } else {
        this.$emit('changec', index)
        this.$emit('input', false)
      }
    }
  },
  computed: {
    lastchannel () {
      return this.allchannels.filter(item => {
        const b = this.channels.findIndex(item2 => {
          return item2.name === item.name
        })
        if (b > -1) {
          return false
        } else {
          return true
        }
      })
    }
  }
}
</script>

<style scoped lang="less">
span {
  font-size: 16px;
}
.main {
  // padding-top: 46px;
  padding: 46px 10px 0;
}
.col {
  position: relative;
  height: 40px;
  background-color: #8fbc8f;
  margin-top: 10px;
  margin-bottom: 10px;
  margin-left: 12px;
  font-size: 10px;
  color: white;
  line-height: 40px;
  text-align: center;
  border: 1px solid #000;
}
.crossicon {
  position: absolute;
  right: 1px;
  top: 1px;
}
.left {
  max-width: 70%;
  white-space:nowrap;
  span:nth-child(2) {
    margin-left: 10px;
    color: rgb(152, 149, 149);
    font-size: 8px;
  }
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
</style>
