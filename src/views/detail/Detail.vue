<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="detailNav"/>
    <scroll class="detail-scroll"
            @scroll="contentScroll"
            ref="scroll"
            :pullUpLoad="true"
            :probe-type="3">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"/>
      <detail-param-info :param-info="paramsInfo" ref="params"/>
      <detail-comment-info :comment-info="commentInfo" ref="comment"/>
      <goods-list :goods="goodsList" ref="recommend"/>
    </scroll>
    <back-top @click.native="backTop" v-show="isShowBackTop"/>
    <detail-bottom-bar @addToCart="addToCart"/>
  </div>
</template>

<script>
  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamInfo from './childComps/DetailParamInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  // import BackTop from 'components/content/backTop/backTop'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import {getDetail, Goods, Shop, GoodsParam, getRecommend} from "network/detail";
  import {itemListenerMixin,backTopMixin} from "common/mixin";
  import {debounce} from "common/utils";
  import {mapActions} from 'vuex'


  export default {
    name: "Detail",
    data() {
      return {
        iid: null,
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramsInfo: {},
        commentInfo: {},
        goodsList: [],

        themeTopYs:[],
        getThemeTopYs:null,
        currentIndex:null
      }
    },
    mixins:[itemListenerMixin,backTopMixin],
    components: {
      DetailSwiper,
      DetailNavBar,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamInfo,
      DetailCommentInfo,
      DetailBottomBar,

      // BackTop,
      GoodsList,
      Scroll,
      // Toast
    },
    created() {
      //1.保存传入的iid
      this.iid = this.$route.params.iid
      //2.根据iid请求详细数据
      getDetail(this.iid).then(res => {
        //1.获取顶部的图片轮播数据
        // console.log(res);
        const data = res.result
        this.topImages = data.itemInfo.topImages
        //2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
        //3.获取店铺信息
        this.shop = new Shop(data.shopInfo)
        //4.获取商品的详情信息
        this.detailInfo = data.detailInfo
        //5.获取参数信息
        this.paramsInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
        //6.保存评论信息
        if (data.rate.list) {
          this.commentInfo = data.rate.list[0];
        }
        //下一帧函数，回调函数
        // this.$nextTick(() => {
        //   this.themeTopYs = []
        //   this.themeTopYs.push(0)
        //   this.themeTopYs.push(this.$refs.params.$el.offsetTop - 44)
        //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop -44)
        //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop -44)
        //   console.log(this.themeTopYs);
        // })
      })
      //3.请求推荐
      this._getRecommend()
      //4.给getThemeTopYs赋值(对this.themeTopYs赋值进行防抖)
      this.getThemeTopYs = debounce(()=>{
        this.themeTopYs = []
        this.themeTopYs.push(0)
        this.themeTopYs.push(this.$refs.params.$el.offsetTop - this.$refs.scroll.$el.offsetTop)
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop -this.$refs.scroll.$el.offsetTop)
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop -this.$refs.scroll.$el.offsetTop)
        //在themeTops添加一个最大数
        this.themeTopYs.push(Number.MAX_VALUE)
        // console.log(this.themeTopYs);
        // console.log(this.$refs.scroll.$el.offsetTop);
      })
    },
    methods: {
      ...mapActions(['addCart']),
      titleClick(index){
        // console.log(index);
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],200)
      },

      contentScroll(position) {
        // console.log(position);
        //1.判断backTop是否出现
        let positionY = -position.y
        this.isShowBackTop = (-position.y) > 1000
        const length = this.themeTopYs.length
        // for (let i = 0;i<length;i++){
          // if (this.currentIndex !== i&&
          //     ((i<length -1 && positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i+1]) ||
          //         (i ===length-1 && positionY > this.themeTopYs[i]))){
          //           this.currentIndex = i
          //           this.$refs.detailNav.currentIndex = this.currentIndex
          // }

        // }
        //在themeTops里添加一个最大数，少一个判断条件，更简洁
        for (let i = 0;i<length-1;i++){
          if (this.currentIndex !== i&& (i<length -1 && positionY >= this.themeTopYs[i] && positionY <= this.themeTopYs[i+1])){
            this.currentIndex = i
            this.$refs.detailNav.currentIndex = this.currentIndex
          }
        }
      },
      imageLoad() {
        this.$refs.scroll.refresh()
        this.getThemeTopYs()
      },
      addToCart() {
        // 2.将商品信息添加到Store中
        const obj = {}
        obj.iid = this.iid
        obj.imgURL = this.topImages[0]
        obj.title = this.goods.title
        obj.desc = this.goods.desc
        obj.price = this.goods.realPrice
        // this.$store.dispatch('addToCart', obj).then(() => {
        //  this.$toast({message: '加入购物车成功'})
        // })
        // this.addCart(obj).then(() => {
        //   this.$toast({message: '加入购物车成功'})
        // })
        // this.$store.commit('addCart',obj)
        //第一种回调方法
        // this.$store.dispatch('addCart',obj).then(res => {
        //   console.log(res);
        // })
        //第二种回调方法=====将actions中的函数映射过来
        this.addCart(obj).then(res => {
          this.$toast.show(res,1800)
        })

      },
      _getRecommend() {
        getRecommend().then(res => {
          this.goodsList = res.data.list
          // console.log(res.data.list[0].image);
        })
      }
    },
    mounted() {
    },
    destroyed() {
      this.$bus.$off('imageItemLoad',this.imageItemLoad)
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-scroll {
    height: calc(100% - 44px - 58px);
    overflow: hidden;
  }

  .detail-nav {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>