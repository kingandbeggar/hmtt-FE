<template>
  <div class="app">
    <van-nav-bar
      title="搜索结果"
      :border="false"
      left-arrow
      fixed
      @click-left="$router.go(-1)"
    />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="😕我是有底线的"
      loading-text="使劲加载中。。。"
      @load="onLoad"
      :immediate-check="false"
      offset="50"
    >
      <ArticleItem
        v-for="a in allchannellist"
        :key="a.art_id"
        :list="a"
        @click.native="$router.push(`/articledetail/${a.art_id}`)"
        @gocomment="$router.push(`/articledetail/${a.art_id}?c=1`)"
      />
    </van-list>
  </div>
</template>

<script>
import ArticleItem from '@/components/ArticleList/ArticleItem'
export default {
  name: 'SearchResult',
  components: { ArticleItem },
  data () {
    return {
      allchannellist: [],
      page: 1,
      limit: 10,
      loading: false,
      finished: false
    }
  },

  mounted () {
    this.getartlist()
  },
  methods: {
    async getartlist () {
      try {
        const res = await this.$API.search.getresult(
          this.$route.params.kw,
          this.page,
          this.limit
        )
        if (res.status === 200) {
          this.allchannellist = [
            ...this.allchannellist,
            ...res.data.data.results
          ]
          console.log(res)
          if (res.data.data.results.length === 0) {
            this.finished = true
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    },
    onLoad () {
      this.page++
      this.getartlist()
      this.loading = false
    }
  }
}
</script>

<style scoped lang="less">
.app {
  padding: 50px 10px 0;
}
</style>
