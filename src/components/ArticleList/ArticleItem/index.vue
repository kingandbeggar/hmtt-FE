<template>
  <div style="margin-bottom: 10px">
    <van-cell-group>
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <template #title>
          <!-- 一张图 -->
          <div class="titleandimg">
            <span class="custom-title">{{ list.title }}</span>
            <van-image
              v-if="list.cover.type === 1"
              class="rightimg"
              fit="cover"
              :src="list.cover.images[0]"
            />
          </div>
          <!-- 三张图 -->
          <div class="bottomimg" v-if="list.cover.type === 3">
            <van-image
              v-for="(li, index) in list.cover.images"
              :key="index"
              class="rightimg"
              fit="cover"
              :src="li"
            />
          </div>
        </template>
        <template #label>
          <div class="txt">
            <span>{{ list.aut_name }}</span>
            <span>{{ list.comm_count }} 评论</span>
            <span>{{ gettimeago(list.pubdate) }}</span>
          </div>
          <!-- x按钮 -->
          <van-icon name="cross" @click="showaction"/>
          <van-action-sheet
            v-model="show"
            :actions="actions"
            :cancel-text="canceltext"
            @cancel="onCancel"
            get-container="body"
            @select="select"
          />
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import { Toast } from 'vant'
import { timeAgo } from '@/utils/date'
import { firstActions, secondActions } from '@/api/report'
export default {
  name: 'ArticleItem',
  props: ['list'],
  data () {
    return {
      show: false,
      actions: firstActions,
      canceltext: '取消'
    }
  },

  mounted () {
    // this.getartlist()
  },
  methods: {
    gettimeago: timeAgo,
    onCancel () {
      if (this.canceltext === '取消') {
        Toast('取消')
      } else {
        this.actions = firstActions
        this.show = true
        this.canceltext = '取消'
      }
    },
    showaction () {
      this.show = true
      this.actions = firstActions
      this.canceltext = '取消'
    },
    select (action) {
      if (action.name === '反馈垃圾内容') {
        this.actions = secondActions
        this.canceltext = '返回'
      } else {
        Toast.success('反馈成功')
        this.show = false
      }
    }
  }
}
</script>

<style scoped lang="less">
.van-cell {
  padding: 0;
}
.titleandimg {
  display: flex;
  justify-content: space-between;
  vertical-align: top;
  span {
    flex: 1;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
}
.rightimg {
  width: 113px;
  height: 70px;
}
/deep/ .van-cell__label {
  display: flex;
  justify-content: space-between;
  span {
    margin-right: 20px;
  }
}
.bottomimg {
  display: flex;
  justify-content: space-between;
  .rightimg:nth-child(2) {
    margin: 0 2px;
  }
}
</style>
