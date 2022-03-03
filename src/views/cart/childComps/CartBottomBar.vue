<template>
  <div class="bottom-bar">
     <div class="check-content">
       <check-button
               class="check-button"
               :is-checked="isSelectAll" @click.native="checkClick"/>
       <span>全选</span>
     </div>
     <div class="price">合计:{{totalPrice}}</div>
     <div class="calculate" @click="calcClick">
       去计算({{checkLength}})
     </div>
  </div>
</template>

<script>
  import CheckButton from 'components/content/checkButton/CheckButton'
  export default {
    name: "CartBottomBar",
    components:{
      CheckButton
    },
    computed:{
      totalPrice(){
        return "￥"+ this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue + item.price * item.count
        },0).toFixed(2)
      },
      checkLength(){
        return this.$store.state.cartList.filter(item => {
          return item.checked
        }).reduce((preValue,item) => {
          return preValue + item.count
        },0)
      },
      isSelectAll(){
        if (this.$store.state.cartList.length === 0) return false
        return !this.$store.state.cartList.find(item => {
          return !item.checked
        })
      }
    },
    methods:{
      checkClick(){
         if (this.isSelectAll) {
           this.$store.state.cartList.forEach(item => item.checked = false)
         }else {
           this.$store.state.cartList.forEach(item => item.checked = true)
         }
      },
      calcClick(){
        if (!this.$store.state.cartList.find(item => item.checked)) {
           this.$toast.show("请选择商品",2000)
        }
      }
    }
  }
</script>

<style scoped>
 .bottom-bar{
   position: relative;
   display: flex;
   height: 40px;
   line-height: 40px;
   background-color: #eee;

 }
  .check-content{
    display: flex;
    align-items: center;
    margin-left: 5px;
    width: 18%;
  }
  .check-button{
    width: 20px;
    height: 20px;
    line-height: 20px;
    margin-right: 5px;
  }
  .price{
    margin-left: 20px;
    width: 60%;
    color: orangered;
  }
  .calculate{
    text-align: center;
    width: 22%;
    color: white;
    background-color: orangered;
  }
</style>