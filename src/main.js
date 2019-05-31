// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import ECharts from 'vue-echarts/components/ECharts.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'babel-polyfill'
import Promise from 'bluebird'
Vue.prototype.$http = axios
if (window.prototype !== 'undefined') {
} else {
  window.prototype.promise = Promise
}
Vue.config.productionTip = false

Vue.use(ElementUI)
Vue.component('chart', ECharts)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
