<template>
  <div class="cart">
    <!--导航栏-->
    <nav-bar class="cart-nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <!--列表-->
    <cart-list/>
    <!--底部汇总-->
    <cart-bottom-bar/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'

  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'
  //mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性：
  import {mapGetters} from 'vuex'
  export default {
    name: "Cart",
    components:{
      NavBar,
      mapGetters,
      CartList,
      CartBottomBar
    },
    computed:{
      //两种语法
      // ...mapGetters(['cartLength','cartList'])
      ...mapGetters({
            length:'cartLength',
      }
        )
    }
  }
</script>

<style scoped>
  .cart{
     height: 100vh;
  }
 .cart-nav-bar{
   background-color: var(--color-tint);
   color: #fff;
   font-size: 18px;
 }
</style>