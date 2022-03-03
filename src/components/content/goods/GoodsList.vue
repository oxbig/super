<template>
  <div class="goods">
     <goods-list-item v-for="item in goods" :goods-item="item"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem'
  export default {
    name: "GoodsList",
    components:{
      GoodsListItem
    },
    props:{
      goods:{
        type:Array,
        default(){
          return[]
        }
      }
    }
  }
</script>

<style scoped>
.goods{
  display: flex;
  /*包括---让弹性盒元素在必要的时候拆行:*/
  flex-wrap: wrap;
  /*均等分===使每个元素之间和元素距离边距的距离都相等*/
  justify-content: space-evenly;
}
</style>