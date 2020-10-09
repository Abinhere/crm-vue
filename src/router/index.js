import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const routes = [
  //默认
  {
    path:"",
    redirect:"/login"
  },
  {
    path:"/login",
    component:Login
  },
  {
    path: '/home',
    component: Home
  },
]

const router = new VueRouter({
  routes
})

export default router
