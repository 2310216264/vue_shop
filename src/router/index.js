
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
    name: 'home',
    redirect:'/welcome',
    component: () => import('../view/Home').catch(error=>{
      console.log(error)
    }),
    children:[
      {
        path:'/welcome',
        name:'welcome',
        component: () => import('../components/Home/welcome.vue'),
      },
      {
        path:'/users',
        name:'users',
        component: () => import('../components/users/users.vue'),
      },
      {
        path: '/rights',
        name: 'rights',
        component: () => import('../components/power/Rights.vue'),
      },
      {
        path: '/roles',
        name: 'roles',
        component: () => import('../components/power/roles.vue'),
      }
    ]
  },
]

//push 

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
