<template>
  <div >
    <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="😕我是有底线的"
        loading-text="使劲加载中。。。"
        @load="onLoad"
        :immediate-check="false"
        offset="50"

      >
        <ArticleItem v-for="a,index in allchannellist" :key="index" :list="a" @click.native="$router.push(`/articledetail/${a.art_id}`)" @gocomment="$router.push(`/articledetail/${a.art_id}?c=1`)"/>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { Toast } from 'vant'
import ArticleItem from './ArticleItem'
export default {
  name: 'ArticleList',
  props: ['active'],
  components: { ArticleItem },
  data () {
    return {
      allchannellist: [],
      pre_timestamp: new Date().getTime(),
      loading: false,
      finished: false,
      isLoading: false
    }
  },
  created () {
    this.getartlist()
  },
  methods: {
    async getartlist () {
      try {
        const {
          data: { data: res }
        } = await this.$API.home.getartlist(this.active, this.pre_timestamp)
        this.allchannellist = [...this.allchannellist, ...res.results]
        this.pre_timestamp = res.pre_timestamp
        this.loading = false
        if (res.pre_timestamp === null) {
          this.finished = true
          return
        }
        console.log(res)
      } catch (error) {
        Toast('获取列表失败,再试试吧')
        this.loading = false
        // window.scrollTo(0, 0)
        // const parent = document.querySelector('.van-list')
        // const a = document.querySelector(`.van-list>div:nth-child(${this.allchannellist.length - 3})`)
        // parent.scrollTo(0, a)
      }
    },
    onLoad () {
      this.getartlist()
    },
    onRefresh () {
      setTimeout(() => {
        // this.allchannellist = []
        Object.assign(this._data, this.$options.data())
        this.getartlist()
        Toast('刷新成功')
        this.isLoading = false
      }, 300)
    }
  }
}
</script>

<style scoped lang="less">
.van-list {
  position: relative;
}
</style>
