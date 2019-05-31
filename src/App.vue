<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
  },
}
</script>

<style lang="scss">
body,
ul,
li,
dl,
dt,
dd,
ol {
  margin: 0;
  padding: 0;
  list-style: none;
}
#app {
  font-family: "Microsoft YaHei", Helvetica, Arial, sans-serif;
  font-family: 'PingFangSC-Regular', 'PingFang SC';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  font-size: 14px;
}
</style>
