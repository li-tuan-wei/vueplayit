import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/page/Login'
import Home from '@/page/Home'
import Redirect from '@/page/Redirect'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login,
      desc: '登录'
    },
    {
      path: '/redirect',
      name: 'Redirect',
      component: Redirect
    },
    {
      path: '/home',
      name: '首页',
      component: Home,
      desc: '首页',
      meta: {
        requireAuth: true
      }
    }
  ]
})
