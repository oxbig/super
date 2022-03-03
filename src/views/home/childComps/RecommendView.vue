<template>
  <div class="recommend">
       <div class="recommend-item" v-for="item in recommend">
         <a :href="item.link">
           <img :src="item.image" alt="">
           <div>{{item.title}}</div>
         </a>
       </div>
  </div>
</template>

<script>
  export default {
    name: "RecommendView",
    props:{
      recommend:{
        type:Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .recommend{
    display: flex;
    text-align: center;
    padding: 10px 0 30px;
    border-bottom: 10px solid #eee;
  }
  .recommend-item{
    flex: 1;
  }
  .recommend-item img{
    width: 80px;
    height: 80px;
    margin-bottom: 10px;
  }
</style>