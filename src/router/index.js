import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import User from '../views/user/User'
import Roles from '../views/user/Roles'
import Store from '../store'
import Statics from '../views/statics/Statics.vue'
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
    component: Home,
    meta:{
      name:'应用管理',
      id:"1",
      iconclass:"el-icon-user-solid"
    },
    redirect:"/home/user",
    children:[
      {
        path:'/home/statics',
        component:Statics,
      },
      {
        path:'/home/user',
        component:User,
        meta:{name:"用户管理",id:"2"}
      },
      {
        path:'/home/roles',
        component:Roles,
        meta:{name:"角色管理",id:"3"}
      }
    ]
  },
  {
    path:'/log',
    meta:{name:'日志管理',id:"4",iconclass:"el-icon-document"},
    children:[
      {
        path:'/log/syslog',
        meta:{name:"系统日志",id:"5"}
      },
      {
        path:'/log/oplog',
        meta:{name:"管理员日志",id:"6"}
      },      
      {
        path:'/log/userlog',
        meta:{name:"用户行为统计",id:"7"}
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

//难点 重写原型中的Push 解决报错
// const originVueRoutrt = VueRouter.prototype.push;
// VueRouter.prototype.push = function (location,onComplete,onAbort){
//   return originVueRouter.call(this,location,()=>{})
// }

// 权限验证
//beforeEach跳转到对应的页面前执行
//路由守卫 前置守卫
router.beforeEach((to,from,next)=>{

  if(to.path === '/login'){
    if(sessionStorage.getItem('username')){
      router.push('/home/statics')
    }else{
      next()
    }
    return;
  }

  //加强版本：调用后端接口 + token 真实项目中时
  if(sessionStorage.getItem('username')){
    next()
  }else{
    router.push('/login')
  }
})

//路由守卫 后置守卫
router.afterEach((to,from)=>{
  Store.commit('SET_MENU_ACTIVE',to.meta.id)
})

export default router
