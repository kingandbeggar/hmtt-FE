<template>
  <div>
    <van-nav-bar
      title="编辑资料"
      :border="false"
      left-arrow
      fixed
      @click-left="$router.go(-1)"
    />
    <div class="main">
      <van-cell title="头像" is-link center>
        <template #default>
          <!-- 上传文件 -->

          <van-image
            round
            width="1.5rem"
            height="1.5rem"
            :src="user.photo"
            @click="upload"
          />
          <input
            class="ipt"
            type="file"
            v-show="false"
            ref="iptfile"
            @change="onchange"
            accept="image/*"
          />
        </template>
      </van-cell>
      <van-cell title="名称" is-link center>
        <template #default>
          <span @click="changename">{{ user.name }}</span>
        </template>
      </van-cell>
      <van-dialog
        v-model="show"
        title="请修改："
        show-cancel-button
        :before-close="namechange"
      >
        <input type="text" v-model="username" class="iptname" v-fofo />
      </van-dialog>
      <van-cell title="生日" is-link center>
        <template #default>
          <span @click="showpicker = true">{{ user.birthday }}</span>
        </template>
      </van-cell>
      <van-popup
        v-model="showpicker"
        position="bottom"
        :style="{ height: '50%' }"
        round
      >
        <van-datetime-picker
          v-model="currentDate"
          type="date"
          title="选择年月日"
          :min-date="minDate"
          :max-date="maxDate"
          @cancel="showpicker = false"
          @confirm="confirmdate"
        />
      </van-popup>
    </div>
  </div>
</template>

<script>
import { righttime } from '@/utils/date'
import { Toast } from 'vant'
import { mapState } from 'vuex'

export default {
  name: 'UserEdit',
  data () {
    return {
      user: {},
      show: false,
      username: '',
      username2: '',
      minDate: new Date(1920, 0, 1),
      maxDate: new Date(),
      currentDate: '',
      showpicker: false
    }
  },

  computed: {
    ...mapState('user', ['userinfo', 'photo'])
  },
  mounted () {
    this.getuserinfo2()
  },
  methods: {
    async getuserinfo2 () {
      try {
        const res = await this.$API.user.getuserinfo2()
        console.log(res)
        if (res.status === 200) {
          this.user = res.data.data
          this.username = res.data.data.name
          this.username2 = res.data.data.name
        }
      } catch (error) {
        console.log(error.message)
      }
    },
    // 换头像
    async changeacvatar (photo) {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      try {
        const res = await this.$API.user.changeacvatar(photo)
        console.log(res, '1')
        if (res.status === 200) {
          this.$store.commit('user/CHANGEPHOTO', res.data.data.photo)
          this.user.photo = res.data.data.photo
          Toast.success('修改成功')
        }
      } catch (error) {
        console.log(error.message)
      }
    },
    upload () {
      this.$refs.iptfile.click()
    },
    onchange (e) {
      // console.log(document.querySelector('.ipt').files, 'ipt')
      // // 此时可以自行将文件上传至服务器
      // console.log(e.target.files[0])
      const newac = new FormData()
      newac.append('photo', e.target.files[0])
      console.log(newac)
      this.changeacvatar(newac)
    },
    changename () {
      this.show = true
    },
    async namechange (action, done) {
      console.log(this.username)
      console.log(action)
      if (action !== 'confirm') {
        done()
        return
      }
      const reg = /^[0-9a-zA-Z\u4e00-\u9fa5]{1,7}$/
      if (!reg.test(this.username)) {
        Toast.fail('只能1-7位中英文组合')
        document.querySelector('.iptname').focus()
        this.username = this.username2
        done(false)
        return
      }
      try {
        const res = await this.$API.user.changeprofile({ name: this.username })
        console.log(res)
        if (res.status === 200) {
          Toast.success('修改成功')
          this.user.name = this.username
          this.$store.commit('user/CHANGEUSERNAME', this.username)
          done()
        }
      } catch (error) {
        console.log(error.message)
      }
    },
    // 该生日
    async confirmdate () {
      console.log(new Date('2022,1,1'))

      this.currentDate = new Date(
        righttime(this.currentDate).replace(/^-$/g, ',')
      )
      try {
        const res = await this.$API.user.changeprofile({
          birthday: righttime(this.currentDate)
        })
        console.log(res)
        if (res.status === 200) {
          Toast.success('修改成功')
          this.user.birthday = righttime(this.currentDate)
          this.showpicker = false
        }
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}
</script>

<style scoped lang="less">
.main {
  padding-top: 46px;
  /deep/.van-dialog__content {
    text-align: center;
    input {
      border: none;
      outline: none;
      text-align: center;
    }
  }
}
</style>
