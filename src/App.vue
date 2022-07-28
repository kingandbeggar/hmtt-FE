<template>
  <div>
    <div class="app">1</div>
    <van-button loading type="primary" />
    <van-button loading type="primary" loading-type="spinner" />
    <van-button loading type="info" loading-text="加载中..." />
  </div>
</template>

<style lang="less" scoped>
.app {
  width: 375px;
  height: 200px;
  background: pink;
}
</style>
