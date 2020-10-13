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

//这一段用来解决报错 Uncaught (in promise) NavigationDuplicated {_name: “NavigationDuplicated”, name: “NavigationDuplicated”}；
import Router from 'vue-router'
const routerPush = Router.prototype.push
//重写一下原型上的push方法
Router.prototype.push = function push(location) {
return routerPush.call(this, location).catch(error=> error)
}

Vue.prototype.$http = axios;

Vue.use(ElementUI);
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
