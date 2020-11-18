import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import SortMenu from './views/SortMenu.vue'
import Ranking from './views/Ranking.vue'
import Detail from './views/Detail.vue'

Vue.use(Router)

const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  routes: [
    {
      // 跳转到首页
      path: '/',
      redirect: '/home'
    },
    {
      // 电影首页路由
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      // 电影分类导航页面路由
      path: '/sortmenu',
      name: 'SortMenu',
      component: SortMenu
    },
    {
      // 电影排行榜页面路由
      path: '/ranking',
      name: 'Ranking',
      component: Ranking
    },
    {
      // 电影详情页面路由
      path: '/detail',
      name: 'Detail',
      component: Detail
    }
  ]
})
