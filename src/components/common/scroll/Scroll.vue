<template>
  <!--res绑定子组件-->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import Bscroll from 'better-scroll'

  export default {
    name: "Scroll",
    data() {
      return {
        scroll: null
      }
    },
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    mounted() {
      this.scroll = new Bscroll(this.$refs.wrapper, {
        probeType: this.probeType,
        pullUpLoad: this.pullUpLoad,
        click: true
      })
      //监听上拉位置
      if (this.probeType === 2 || this.probeType === 3) {
        this.scroll.on('pullingUp', () => {
          // console.log("上拉加载更多");
          this.$emit('pullingUp')
        })
      }

      //监听滚动位置
      if (this.pullUpLoad) {
        this.scroll.on('scroll', (position) => {
          this.$emit('scroll', position)

        })
      }
    },
    methods: {
      scrollTo(x, y, time = 300) {
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      },
      refresh() {
        // console.log("-----");
        this.scroll && this.scroll.refresh()
      },
      getScrollY() {
        return this.scroll ? this.scroll.y : 0
      }
    }
  }
</script>

<style scoped>
  .wrapper {

  }
</style>