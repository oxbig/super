<template>
  <div id="app">
    <div id="nav">
      <keep-alive exclude="Detail">
        <router-view/>
      </keep-alive>
      <!--<tab-bar>-->
        <main-tab-bar></main-tab-bar>
      <!--</tab-bar>-->

    </div>

  </div>
</template>
<script>
  // import TabBar from 'components/common/tabbar/TabBar'
  import MainTabBar from 'components/content/tabbar/MainTabBar'
  export default {
    name:'App',
    components:{
      // TabBar,
      MainTabBar
    }
  }
</script>
<style>
@import "./assets/css/base.css";
</style>
