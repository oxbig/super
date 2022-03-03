<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']"
            @tabClick="tabClick"
            ref="tabControl1"
            class="tab-control"
            v-show="isFixed"/>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @scroll="contentScroll"
            :pullUpLoad="true" @pullingUp="loadMore">
      <home-swiper :banners="banner" @imageSwiperLoad="imageSwiperLoad" class="home-swp"></home-swiper>
      <recommend-view :recommend="recommend"></recommend-view>
      <feature-view/>
      <tab-control :titles="['流行','新款','精选']"
              @tabClick="tabClick" ref="tabControl2"/>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import NavBar from 'components/common/navbar/NavBar'
  import TabControl from 'components/content/tabControl/TabControl'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'

  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import {debounce} from "common/utils";
  import {getHomeMultidata, getHomeGoods} from 'network/home'
  import {itemListenerMixin,backTopMixin} from "common/mixin";

  export default {
    name: "Home",
    components: {
      NavBar,
      TabControl,
      GoodsList,
      Scroll,
      HomeSwiper,
      RecommendView,
      FeatureView
    },
    mixins:[itemListenerMixin,backTopMixin],
    data() {
      return {
        banner: [],
        recommend: [],
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        currentType: 'pop',
        tabOffset: 0,
        isFixed: false,
        saveY:0,
      }
    },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')

    },
    activated(){
      // console.log('activated');
      this.$refs.scroll.scrollTo(0,this.saveY,0.1)
      this.$refs.scroll.refresh()
    },
    deactivated(){
      // console.log('deactivated');
      //保存saveY的信息
      this.saveY = this.$refs.scroll.getScrollY()
      //取消全局监听函数
      this.$bus.$off('imageItemLoad',this.imageItemLoad)
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    mounted() {


    },
    methods: {
      /**
       * 事件监听相关的方法
       */

      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      contentScroll(position) {
        // console.log(position);
        //1.判断backTop是否出现
        this.isShowBackTop = (-position.y) > 1000
        //2.决定tabControl是否吸顶
        this.isFixed = (-position.y) > this.tabOffset
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
        //图片加载过后刷新
        this.$refs.scroll.scroll.refresh()
      },
      imageSwiperLoad() {
        //获取tabControl的offsetTop
        //所有组件中和都有一个元素$el，用于获取组建中的元素
        this.tabOffset = this.$refs.tabControl2.$el.offsetTop
      },
      /**
       * 网络请求相关的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          this.banner = res.data.banner.list
          this.recommend = res.data.recommend.list
          // console.log(res);
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page + 1
        getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          this.$refs.scroll.finishPullUp()
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    /*padding-top: 44px;*/
    height: 100vh;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: #fff;
    font-size: 18px;

    /*在使用浏览器原生滚动时，避免组件随着浏览器滚动*/
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 99;*/
  }

  /*.fixed {*/
  /*position: fixed;*/
  /*top: 44px;*/
  /*left: 0;*/
  /*right: 0;*/


  /*}*/
.tab-control{
  position: relative;
  z-index: 9;
}
  .content {
    position: absolute;
    left: 0;
    right: 0;
    top: 44px;
    bottom: 49px;
    overflow: hidden;
  }

  /*.content{*/
  /*height: calc(100% - 93px);*/
  /*overflow: hidden;*/
  /*margin-top: 44px;*/
  /*}*/
.home-swp{
  margin-top: -2px;
}
</style>