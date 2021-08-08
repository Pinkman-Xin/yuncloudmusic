import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import fastclick from 'fastclick'
import './assets/css/base.scss'
import VueLazyload from 'vue-lazyload'
import Loading from './plugin/loading/index'
Vue.use(Loading)
Vue.use(VueLazyload, {
  loading: require('./assets/images/loading.png'),
})
fastclick.attach(document.body)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  beforeCreate(){
    Vue.prototype.$bus = this
  },
}).$mount('#app')
