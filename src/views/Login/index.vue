<template>
  <div>
    <van-nav-bar title="黑马头条-登录" />
    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        label="手机号"
        required
        placeholder="用户名"
        :rules="[
          {
            validator: isphone,
            message: this.mobile ? '请输入正确手机号' : '请输入手机号',
            required: true,
          },
        ]"
      />
      <van-field
        v-model.trim="code"
        type="password"
        name="code"
        required
        label="密码"
        placeholder="密码"
        :rules="[
          {
            pattern: /^\d{6}$/,
            message: this.code ? '请填写正确密码' : '请填写密码',
          },
        ]"
      >
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            slot="button"
            :time="1000 * 60"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            size="small"
            type="info"
            native-type="button"
            v-else
            @click="sendcode"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { settoken } from '@/utils/token'
export default {
  name: 'Login',
  data () {
    return {
      mobile: '15651515555',
      code: '246810',
      isCountDownShow: false
    }
  },

  methods: {
    isphone (val) {
      return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(
        val
      )
    },
    // 登录
    async onSubmit (values) {
      Toast.loading({
        message: '加载中...',
        forbidClick: true,
        loadingType: 'spinner',
        duration: 0
      })
      try {
        const res = await this.$API.login.gologin(values)
        settoken(res.data.data.token)
        Toast({ message: '登陆成功', type: 'success' })
      } catch (error) {
        Toast.fail(error.response.data.message)
      }
    },
    // 发送验证码
    async sendcode () {
      try {
        await this.$refs.form.validate('mobile')
        this.isCountDownShow = true
      } catch (error) {
        return Toast({
          message: this.mobile ? '请输入正确手机号' : '请输入手机号',
          type: 'fail'
        })
      }
      Toast({ message: '发送成功', type: 'success' })
    }
  }
}
</script>

<style  lang="less" scoped>
.van-hairline--bottom::after {
  border: 0;
}
</style>
