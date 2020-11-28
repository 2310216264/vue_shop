
import { Message } from 'element-ui'
import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/Login'
import '../plugins/element'

Vue.use(VueRouter)

const routes = [
  {
    path:'/',
    redirect:'/login'
  },
  {
    path: '/login',
    name: 'login',
    component: login
  },
  {
    path: '/home',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ '../components/Home.vue')
  },
]

const router = new VueRouter({
  routes
})

router.beforeEach((to,from,next)=>{
  if(to.path == '/login'){
    return  next()
  }

  const token = window.sessionStorage.getItem('token');
  if(!token){
    Message.error('请登录')
    return next('/login')
  }
  next()
})


export default router
