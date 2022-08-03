<template>
  <div class="app">
    <div class="img">
      <van-image
      round
      src="https://pic4.zhimg.com/80/v2-e6f3d4c41fd200971a7ee0aa4d772c44_720w.jpg?source=1940ef5c"
    />
    <!-- <span>此页面也正在开发中。。。🏗️</span> -->
    <van-notice-bar left-icon="volume-o" :scrollable="false"   background="#e9c2e9"
  color="white">
  <van-swipe
    vertical
    class="notice-swipe"
    :autoplay="1000"
    :show-indicators="false"
  >
    <van-swipe-item>没错！</van-swipe-item>
    <van-swipe-item>此页面同样正在开发中</van-swipe-item>
    <van-swipe-item>。。。</van-swipe-item>

  </van-swipe>
</van-notice-bar>
  </div>
    </div>
</template>

<script>
export default {
  name: 'Info'
}
</script>

<style scoped lang="less">
.app {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #e9c2e9;
}
.img {
position: absolute;
left: 50%;
top: 50%;
transform: translate(-100px,-150px);
  text-align: center;
}
.van-image {
  width: 200px;
  height: 200px;
}
span {
  font-size: 10px;
  font-weight:700;
}
.notice-swipe {
    height: 40px;
    line-height: 40px;
  }
</style>
