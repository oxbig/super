<template>
  <div id="MainTabBar">
    <tab-bar-item activeColor="red" path="/home">
      <img slot="item-icon" src="~assets/img/tabbar/home.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/home_active.svg" alt="">
      <div slot="item-text">首页</div>
    </tab-bar-item>
    <tab-bar-item activeColor="red" path="/category">
      <img slot="item-icon" src="~assets/img/tabbar/category.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/category_active.svg" alt="">
      <div slot="item-text">分类</div>
    </tab-bar-item>
    <tab-bar-item activeColor="red" path="/cart">
      <img slot="item-icon" src="~assets/img/tabbar/shopcart.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/shopcart_active.svg" alt="">
      <div slot="item-text">购物车</div>
    </tab-bar-item>
    <tab-bar-item activeColor="red" path="/profile">
      <img slot="item-icon" src="~assets/img/tabbar/profile.svg" alt="">
      <img slot="item-icon-active" src="~assets/img/tabbar/profile_active.svg" alt="">
      <div slot="item-text">个人</div>
    </tab-bar-item>
  </div>
</template>
  <script>
    import TabBarItem from 'components/common/tabbar/TabBarItem'

    export default {
      name: "MainTabbar",
      components: {
        TabBarItem
      }
    }
  </script>

  <style scoped>
    #MainTabBar{
      display: flex;
      text-align: center;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: #f4f4f4;
    }

  </style>