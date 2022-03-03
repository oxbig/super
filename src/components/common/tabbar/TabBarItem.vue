<template>
  <div class="tabbaritem" @click="itemColor">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :style="activeStyle">
      <slot name="item-text"></slot>
    </div>

  </div>
</template>

<script>
  export default {
    name: "TabBarItem",
    props: {
      path: String,
      activeColor: {
        type: String,
        default:'red'
      }
    },
    // data(){
    //   return{
    //
    //   }
    // },
    computed: {
      isActive() {
        return this.$route.path.indexOf(this.path) !== -1
      },
      activeStyle() {
        return this.isActive ? {color: this.activeColor} : {}
      }
    },
    methods: {
      itemColor() {
        if (this.$route.path.indexOf(this.path)){
          this.$router.replace(this.path)
        }
        console.log(this.$route.path.indexOf(this.path));
      }
    }
  }
</script>

<style scoped>
  .tabbaritem {
    flex: 1;
    height: 49px;
    font-size: 14px;
  }

  .tabbaritem img {
    width: 24px;
    height: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }

</style>