<template>
  <div class="app">
    <div class="img">
      <van-image
      round
      src="https://pic4.zhimg.com/80/v2-e6f3d4c41fd200971a7ee0aa4d772c44_720w.jpg?source=1940ef5c"
    />
    <span></span>
  <van-notice-bar
  left-icon="volume-o"
  text="此页面正在开发中。。。🚧"
  background="#8f8fbd"
  color="white"
/>

  </div>
    </div>
</template>

<script>
export default {
  name: 'Category'
}
</script>

<style scoped lang="less">
.app {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #8f8fbd ;
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
</style>
