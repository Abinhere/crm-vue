import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import '../src/assets/css/common.css';
import '../src/assets/css/reset.css';
import axios from 'axios'
//mock用来拦截ajax请求
import "../mock/index"

Vue.prototype.$http = axios;

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
