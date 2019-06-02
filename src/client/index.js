import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from './store/store'
import axios from 'axios'

Vue.config.debug = true
Vue.config.productionTip = false
Vue.prototype.$http = axios

axios.defaults.timeout = 10000;  //超时响应
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'; // 配置请求头

new Vue({
  el: '#app',
  router: router,
  store: store,
  template: '<App/>',
  components: {
    App
  }
})

