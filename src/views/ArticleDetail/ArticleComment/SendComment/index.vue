<template>
  <div>
    <div class="small" v-if="!showbig">
      <van-nav-bar
        :border="false"
        left-arrow
        @click-left="$router.go(-1)"
        class="bottomnavbar"
      >
        <template #title>
          <van-search
            shape="round"
            placeholder="发表评论"
            background="transparent"
            class="search"
            @click="showbig = true"

          >
          </van-search>
        </template>
      </van-nav-bar>
      <div class="right">
        <van-badge
          :content="total_count === 0 ? '' : total_count"
          color="#1989fa"
        >
          <van-icon name="chat-o" size="0.7rem" @click="scrollthis" />
        </van-badge>
        <van-icon name="star-o" size="0.7rem" />
        <van-icon name="share-o" size="0.7rem" />
      </div>
    </div>
    <div class="big" v-else>
      <textarea class="txa" placeholder="友善评论，理性发言"  v-model="comment" @blur="leavebig" v-fofo></textarea>
      <van-button plain type="primary" size="small" class="sendbtn" @click="sendcomment"
        >发布</van-button
      >
    </div>
  </div>
</template>

<script>
// import { timeAgo } from '@/utils/date'
export default {
  name: 'SendComment',
  props: ['total_count'],
  data () {
    return {
      showbig: false,
      comment: ''
    }
  },

  methods: {
    scrollthis () {
      this.$emit('scrollthis')
    },
    async sendcomment () {
      try {
        const res = await this.$API.article.addcomment(this.$route.params.artid, this.comment)
        if (res.status === 201) {
          this.$emit('sendcomment', res.data.data.new_obj)
          this.comment = ''
          this.showbig = false
        }
      } catch (error) {
        console.log(error.message)
      }
    },
    leavebig () {
      setTimeout(() => {
        this.showbig = false
        this.comment = ''
      }, 200)
    }

  }
}
</script>

<style scoped lang="less">
.bottomnavbar {
  // position: relative;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
}
.search {
  position: absolute;
  left: 30px;
  top: -4px;
  max-width: 60%;
}
.van-icon {
  margin-left: 10px;
}
/deep/.van-nav-bar__right {
  padding-right: 18px;
  max-width: 35%;
}
.bottomnavbar {
  background-color: #fff;
}
/deep/.van-icon {
  color: black;
}
/deep/.van-field__left-icon {
  display: none;
}
/deep/.van-search__content {
  border: 1px solid #ccc;
}
.right {
  position: fixed;
  right: 15px;
  bottom: 8px;
  z-index: 1999999;
  // background-color: red;
}
.big {
  box-sizing: border-box;
  display: flex;
  // justify-content: space-between;
  align-items: center;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 70px;
  padding: 5px;
  border-top: 1px solid #ccc;
  line-height: 70px;
  background-color: #fff;
  .txa {
    flex: 1;
    height: 80%;
    background-color: rgb(238, 235, 235);
    border: 1px solid #ccc;
    padding: 5px;
    font-size: 10px;
    line-height: 20px;
    border-radius: 10px;
    resize: none;
    outline: none;
    // overflow: hidden;
  }
  .sendbtn {
    margin: 0 10px;
    height: 100%;
    border: none;
  }
}
</style>
