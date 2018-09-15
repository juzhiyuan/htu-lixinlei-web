<template>
  <div id="app">
    <mu-appbar style="width: 100%;" color="primary">
      <mu-button icon slot="left">
        <mu-icon value="menu"></mu-icon>
      </mu-button>
      {{appbarTitle}}
    </mu-appbar>
    <router-view class="router-view"/>
  </div>
</template>

<script>
export default {
  computed: {
    appbarTitle () {
      return this.$store.state.appbarTitle
    }
  }
}
</script>

<style lang="less">
#app {
  .router-view {
    padding-top: 64px;
  }
}
</style>
