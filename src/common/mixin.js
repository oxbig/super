import {debounce} from "./utils";
import BackTop from "../components/content/backTop/backTop";

export const itemListenerMixin = {
  data() {
    return {
      imageItemLoad: null
    }
  },
  mounted() {
    //防抖函数
    const refresh = debounce(this.$refs.scroll.refresh, 300)
    //监听item中图片加载完成
    this.imageItemLoad = () => {
      // console.log('=====');
      refresh()
    }
    this.$bus.$on('imageItemLoad', this.imageItemLoad)
    // console.log('我是混入内容');
  }
}
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isShowBackTop: false,
    }
  },
  methods:{
    backTop() {
      this.$refs.scroll.scrollTo(0, 0)
    },
  }
}