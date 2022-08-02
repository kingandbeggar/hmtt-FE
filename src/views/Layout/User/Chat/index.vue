<template>
  <div>
    <van-nav-bar
      title="小思同学"
      :border="false"
      left-arrow
      fixed
      @click-left="$router.go(-1)"
    />
    <div class="main">
      <div v-for="(li, index) in list" :key="index">
        <div class="xiaosi" v-if="li.name === 'xs'">
          <div class="img">
            <van-image
              round
              width="1.3rem"
              height="1.3rem"
              src="https://img01.yzcdn.cn/vant/cat.jpeg"
            />
          </div>
          <div class="bd bd1">
            {{ li.msg }}
            <div class="square square1"></div>
          </div>
        </div>

        <div class="me right" v-else>
          <div class="bd bd2" >
            {{ li.msg }}
            <div class="square square2"></div>
          </div>
          <div class="img">
            <van-image
              round
              width="1.3rem"
              height="1.3rem"
              :src="photo || userinfo.photo"
            />
          </div>
        </div>
      </div>
    </div>
    <van-field v-model="sms" center clearable placeholder="请输入" class="send">
      <template #button>
        <van-button size="small" type="primary" @click="sendmsg" :disabled="sms.trim().length ===0">发送</van-button>
      </template>
    </van-field>
  </div>
</template>

<script>
// 导入 socket.io-client 包
import { io } from 'socket.io-client'
import scrollIntoView from 'smooth-scroll-into-view-if-needed'
import { mapState } from 'vuex'

// 定义变量，存储 websocket 实例
let socket = null
export default {
  name: 'Chat',
  data () {
    return {
      list: [
        // 只根据 name 属性，即可判断出这个消息应该渲染到左侧还是右侧
        { name: 'xs', msg: 'hi，你好！我是小思' }

      ],
      sms: ''
    }
  },
  computed: {
    ...mapState('user', ['photo', 'userinfo'])
  },
  methods: {
    sendmsg () {
      // 判断内容是否为空
      if (!this.sms) return

      // 添加聊天消息到 list 列表中
      this.list.push({
        name: 'me',
        msg: this.sms
      })
      // 把消息发送给 websocket 服务器
      socket.emit('message', {
        msg: this.sms,
        timestamp: new Date().getTime()
      })

      // 清空文本框的内容
      this.sms = ''
      scrollIntoView(document.querySelector('.main>div:last-child'))
    }
  },
  created () {
    // ...

    // 创建客户端 websocket 的实例
    socket = io('http://geek.itheima.net', {
      query: {
        token: this.token
      },
      transports: ['websocket']
    })
    // 建立连接的事件
    socket.on('connect', () => {
      console.log('与服务器建立了连接')
    })
    // 接收到消息的事件
    socket.on('message', (data) => {
      // 把服务器发送过来的消息，存储到 list 数组中
      this.list.push({
        name: 'xs',
        msg: data.msg
      })
      scrollIntoView(document.querySelector('.main>div:last-child'))
    })
  },
  beforeDestroy () {
    // 关闭连接
    socket.close()
    // 销毁 websocket 实例对象
    socket = null
  }
}
</script>

<style scoped lang="less">
.main {
  padding: 65px 15px 53px;
  box-sizing: border-box;
  width: 100vw;
  .xiaosi,
  .me {
    display: flex;
    align-items: top;
    margin-bottom: 10px;
    .img {
      width: 50px;
      height: 50px;
    }

    .bd {
      // flex: 1;
      position: relative;
      padding: 8px;
      background-color: #8fbc8f;
      border: 1px solid #000;
      font-size: 18px;
      color: white;
      line-height: 30px;
      border-radius: 7px;
      .square {
        position: absolute;
        width: 10px;
        height: 10px;
        background-color: #8fbc8f;
        border-top: 1px solid #000;
        border-left: 1px solid #000;
      }
      .square1 {
        left: -6px;
        top: 13px;
        transform: rotate(-45deg);
      }
      .square2 {
        right: -7px;
        top: 13px;
        transform: rotate(135deg);
      }
    }
    .bd1 {
      margin-left: 15px; //
    }
    .bd2 {
      margin-right: 15px; //
    }
  }
  .right {
    justify-content: right;
    text-align: left;
  }
}
  .send {
    position: fixed;
    bottom: 0;
    left: 0;
  }
</style>
