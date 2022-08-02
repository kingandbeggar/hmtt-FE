<template>
  <div class="app">
    <!-- 顶部搜索 -->
    <form action="/">
      <van-search
        v-model.trim="value"
        show-action
        shape="round"
        placeholder="请输入搜索关键词"
        background="#8fbc8f"
        @search="onSearch"
        @cancel="onCancel"
        @input="oninput"
        v-fofo
      >
        <template #left>
          <van-icon
            name="arrow-left"
            class="lefticon"
            @click="$router.go(-1)"
          />
        </template>
      </van-search>
    </form>
    <!-- 搜索结果 -->
    <div v-if="value !== ''" class="searchword1">
      <div class="searchword" v-for="(o, index) in options" :key="index" v-html="regword(o)" @click="typeresult(o)">
      </div>
    </div>
    <!-- 搜索历史 -->
    <div class="searchhistory" v-if="value === '' && history.length !== 0">
      <van-cell-group>
        <van-cell title="搜索历史">
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #right-icon>
            <van-icon name="delete-o" @click="clearhistory" />
          </template>
        </van-cell>
      </van-cell-group>
      <div class="searchitem">
        <span v-for="(h, index) in history" :key="index" @click="goresult(h)">{{
          h
        }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant'

export default {
  name: 'Search',
  data () {
    return {
      value: '',
      timer: null,
      options: [],
      history: JSON.parse(localStorage.getItem('searchhistory')) || []
    }
  },
  methods: {
    goresult (value) {
      // 监听完在跳转
      this.$nextTick(() => {
        this.$router.push(`/searchresult/${value}`)
      })
    },
    // 回车触发搜索
    onSearch (val) {
      this.history.unshift(this.value)
      this.goresult(val)
    },
    // 点击搜索结果
    typeresult (value) {
      this.history.unshift(value)
      this.goresult(value)
    },
    onCancel () {
      Toast('取消')
      this.options = []
    },
    // 防抖
    oninput () {
      clearTimeout(this.timer)
      this.timer = setTimeout(async () => {
        if (!this.value) return
        try {
          const res = await this.$API.search.getsuggestion(this.value)
          if (res.status === 200) {
            this.options = res.data.data.options
          }
        } catch (error) {
          console.log(error.message)
        }
      }, 300)
    },
    clearhistory () {
      Dialog.confirm({
        title: '删除',
        message: '确认删除历史记录吗？'
      })
        .then(() => {
          // on confirm
          localStorage.removeItem('searchhistory')
          this.history = []
        })
        .catch(() => {
          // on cancel
        })
    },
    regword (old) {
      // 创建正则，value是关键词，ig不区分大小写全局
      const reg = new RegExp(this.value, 'ig')
      return old.replaceAll(reg, (match) => {
        return `<span style="color:red">${match}</span>`
      })
    }
  },
  watch: {
    history () {
      const a = new Set(this.history)
      const nh = Array.from(a)
      localStorage.setItem('searchhistory', JSON.stringify(nh))
    }
  }
}
</script>

<style  lang="less" scoped>
.app {
  width: 100vw;
  height: 100vh;
}
.lefticon {
  margin-right: 5px;
}
.searchitem {
  box-sizing: border-box;
  width: 100vw;
  padding: 10px;
  span {
    display: inline-block;
    height: 20px;
    padding: 5px;
    margin: 5px;
    background-color: #8fbc8f;
    border: 1px solid #000;
    font-size: 10px;
    line-height: 20px;
    color: white;
    border-radius: 10px;
  }
}
.searchword1 {
  padding: 10px;
  .searchword {
    font-size: 15px;
    line-height: 40px;
  }

}
</style>
