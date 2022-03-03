import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import toast from './components/common/toast'
//导入fastclick
import FastClick from 'fastclick'
//导入vue-lazyload
import VueLazyLoad from 'vue-lazyload'
//解决300ms延迟的问题
FastClick.attach(document.body)

Vue.config.productionTip = false
Vue.prototype.$bus = new Vue()
//安装插件toast
Vue.use(toast)
//使用vue-lazyload懒加载的插件
Vue.use(VueLazyLoad,{
   loading:require('./assets/img/common/placeholder.png')
})
new Vue({
  router,
  store,
  toast,
  render: h => h(App)
}).$mount('#app')
