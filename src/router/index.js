import VueRouter from 'vue-router'
import Vue from 'vue'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'
import Article from '@/views/article'
import local from '@/utils/local'
import Image from '@/views/image'
import Publish from '@/views/publish'
import Comment from '@/views/comment'
import Setting from '@/views/setting'
import Fans from '@/views/fans'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    // 登录
    { path: '/login', component: Login },
    // 首页
    {
      path: '/',
      component: Home,
      children: [
        // 欢迎
        { path: '/', component: Welcome },
        // 内容
        { path: '/article', component: Article },
        // 素材
        { path: '/image', component: Image },
        // 发布文章
        { path: '/publish', component: Publish },
        // 评论管理
        { path: '/comment', component: Comment },
        // 个人设置
        { path: '/setting', component: Setting },
        // 粉丝管理
        { path: '/fans', component: Fans }
      ]
    },
    //  404处理
    { path: '*', component: NotFound }
  ]
})

// 路由前置导行守卫
router.beforeEach((to, from, next) => {
  // to 跳转到目标路由对象，
  // from从哪个路由跳转来的
  // next()放行，next(/login)跳转到登录
  const user = local.getUser()
  if (to.path !== '/login' && !user) {
    return next('/login')
  } else {
    next()
  }
})

export default router
