<template>
  <div>
    <van-loading color="#0094ff" v-if="loading" >
      加载中。。。
    </van-loading>
    <div v-else>
      <van-nav-bar
        title="文章详情"
        :border="false"
        left-arrow
        fixed
        @click-left="$router.go(-1)"
      />
      <div class="art">
        <span class="title">{{ article.title }}</span>

        <van-cell center>
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #default>
            <van-button type="info" size="mini" v-if="!article.is_followed" @click="follow(1)"
              >关注</van-button
            >
            <van-button type="primary" size="mini" v-else @click="follow(2)">已关注</van-button>
          </template>
          <template #title>
            <span>{{ article.aut_name }}</span>
          </template>
          <template #label>
            <span>{{ article.pubdate }}</span>
          </template>
          <template #icon>
            <van-image
              class="limg"
              round
              width="1.5rem"
              height="1.5rem"
              :src="article.aut_photo"
            />
          </template>
        </van-cell>
        <div class="article" v-html="article.content" v-highlight></div>
        <van-divider>End</van-divider>
        <div class="good">
          <van-button
            color="#ee0a24"
            plain
            hairline
            v-if="article.attitude !== 1"
            @click="dianzan(1)"
            size="mini"
          >
            <van-icon name="good-job-o" />点赞
          </van-button>
          <van-button type="danger" v-else @click="dianzan(2)" size="mini"
            >已点赞
            <van-icon name="good-job-o" />
          </van-button>
        </div>

          <ArticleComment @scrollthis="scrollthis" />

      </div>
    </div>
  </div>
</template>

<script>
import { Toast } from 'vant'
import ArticleComment from './ArticleComment'
import scrollIntoView from 'smooth-scroll-into-view-if-needed'
export default {
  name: 'ArticleDetail',
  components: { ArticleComment },
  data () {
    return {
      article: {},
      loading: true
    }
  },

  async mounted () {
    await this.getarticle()
    console.log(111)
    if (this.$route.query.c) {
      this.scrollthis()
    }
  },
  methods: {
    async getarticle () {
      try {
        const res = await this.$API.article.getarticle(
          this.$route.params.artid
        )
        if (res.status === 200) {
          console.log(res)
          this.article = res.data.data
          this.loading = false
        }
      } catch (error) {
        console.log(error.message)
      }
    },
    // 点赞
    async dianzan (no) {
      if (no === 1) {
        try {
          const res = await this.$API.article.dianzan(this.article.art_id)
          if (res.status === 201) {
            this.article.attitude = 1
          }
        } catch (error) {
          console.log(error.message)
        }
      } else {
        try {
          const res = await this.$API.article.canceldianzan(
            this.article.art_id
          )
          if (res.status === 204) {
            this.article.attitude = 0
          }
        } catch (error) {
          console.log(error.message)
        }
      }
    },
    scrollthis () {
      const node = document.querySelector('.good')
      scrollIntoView(node)
    },
    // 关注
    async follow (no) {
      if (no === 1) {
        try {
          const res = await this.$API.article.follow(this.article.aut_id)
          if (res.status === 201) {
            this.article.is_followed = true
            Toast('关注成功')
          }
        } catch (error) {
          console.log(error.message)
        }
      } else {
        try {
          const res = await this.$API.article.cancelfollow(this.article.aut_id)
          if (res.status === 204) {
            this.article.is_followed = false
            Toast('取消关注成功')
          }
        } catch (error) {
          console.log(error.message)
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.art {
  padding-top: 46px;
  .title {
    display: block;
    padding: 10px 16px;
    font-size: 16px;
    font-weight: 700;
  }
  .article {
    padding: 10px 16px 0;
    font-size: 12px;
    word-break: break-all; // 允许在单词内换行
    overflow-x: scroll;
    /deep/ img {
      width: 100%;
    }

    /deep/ pre {
      word-wrap: break-word;
      white-space: pre-wrap;
      background-color: #ccc;
    }
  }
  .good {
    text-align: center;
  }
}

.limg {
  margin-right: 10px;
}
.van-loading {
  margin-top: 50vh;
  text-align: center;
}
</style>
