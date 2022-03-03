import Vue from 'vue'
import Vuex from 'vuex'

import mutations from './mutations'
import getters from './getters'
import actions from './actions'
import modules from './modules'
Vue.use(Vuex)
const state = {
  cartList: []
}
export default new Vuex.Store({
  state,
  getters,
  mutations,
  actions,
  modules
})
