import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

export default new Vuex.Store({
  // 用于保存全局共享数据
  state: state,
  // 用户保存修改全局共享的数据方法
  mutations: mutations,
  // actions:用于保存触发mutations中保存的方法的方法
  actions: actions,
  getters: getters,
})
