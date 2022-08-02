<template>
  <div class="chat">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="你已到达世界的尽头🚧"
      @load="onLoad"
      :immediate-check="false"
    >
      <div class="comments" v-for="a,index in comments" :key="index">
        <van-cell center>
          <!-- 使用 right-icon 插槽来自定义右侧图标 -->
          <template #default>
            <van-icon name="like-o" v-if="!a.is_liking" @click="like(1,a)"/>
            <van-icon name="like" color="#F00" v-else @click="like(2,a)"/>
          </template>
          <template #title>
            <span>{{ a.aut_name }}</span>
          </template>
          <template #icon>
            <van-image
              class="limg"
              round
              width="1rem"
              height="1rem"
              :src="a.aut_photo"
            />
          </template>
        </van-cell>
        <div class="main">{{ a.content }}</div>
        <div class="time">{{ gettime(a.pubdate) }}</div>
      </div>
    </van-list>
    <!-- 发送评论窗口 -->
    <SendComment :total_count="total_count" @scrollthis="scrollthis"  @sendcomment="sendcomment"/>
  </div>
</template>

<script>
import { timeAgo } from '@/utils/date'
import { Toast } from 'vant'
import SendComment from './SendComment'
export default {
  name: 'ArticleComment',
  components: { SendComment },
  data () {
    return {
      comments: [],
      loading: false,
      finished: false,
      last_id: null,
      total_count: 0
    }
  },
  mounted () {
    this.getcomments()
  },
  methods: {
    gettime: timeAgo,
    async getcomments () {
      try {
        const res = await this.$API.article.getcomments(
          this.$route.params.artid,
          this.last_id
        )
        if (res.status === 200) {
          console.log(res)
          this.comments = [...this.comments, ...res.data.data.results]
          this.last_id = res.data.data.last_id
          this.total_count = res.data.data.total_count
          if (res.data.data.last_id === null) {
            this.finished = true
          }
        }
      } catch (error) {
        console.log(error.message)
      }
    },
    onLoad () {
      this.getcomments()
      this.loading = false
    },
    scrollthis () {
      this.$emit('scrollthis')
    },
    // 评论点赞
    async like (no, a) {
      if (no === 1) {
        try {
          const res = await this.$API.article.artdianzan(a.com_id)
          if (res.status === 201) {
            a.is_liking = true
            Toast('已点赞')
          }
        } catch (error) {
          console.log(error.message)
        }
      } else {
        try {
          const res = await this.$API.article.artcanceldianzan(a.com_id)
          console.log(res)
          if (res.status === 204) {
            a.is_liking = false
            Toast('已取消点赞')
          }
        } catch (error) {
          console.log(error.message)
        }
      }
    },
    sendcomment (newobj) {
      this.comments.unshift(newobj)
      Toast('评论发布成功')
    }
  }
}
</script>

<style scoped lang="less">
.chat {
  margin-top: 20px;
  margin-bottom: 46px;
  .main {
    padding: 0 20px;
    font-size: 15px;
  }
  .time {
    padding: 0 15px;
    color: rgb(124, 117, 117);
    font-size: 13px;
  }
}
.limg {
  margin-right: 10px;
}
</style>
