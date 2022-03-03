<template>
  <div class="cart-list">
    <Scroll class="content" ref="scroll">
      <cart-list-item
              v-for="(item,index) in list"
              :key="index"
              :item-info="item"
      />
    </Scroll>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import CartListItem from './CartListItem'
  import Scroll from 'components/common/scroll/Scroll'
  export default {
    name: "CartList",
    components:{
      mapGetters,
      CartListItem,
      Scroll
    },
    computed:{
      ...mapGetters({
        list:'cartList'
      })
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 44px - 49px - 40px);
  }
  .content{
    height:100%;
    overflow: hidden;
  }
</style>