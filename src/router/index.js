import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import TJcontent from '../components/TJcontent.vue'
import MusicPContent from '../components/MusicPConent.vue'

Vue.use(Router)
//定义路由:每一个路由映射一个页面组件
const routes = [
    {
        path:'/',
        component: Home,
        name: 'home'
    },
    {
        path:'/gedan',
        component:() => import('../views/GeDan.vue'),
        name: 'gedan',

        children:[
            {
                path: '/tjcontent',
                component :TJcontent
            },
            {
                path: '/mpcontent',
                component :MusicPContent
            }
        ],redirect:'/tjcontent'
    },
    {
        path:'/phb',
        component:() => import('../views/Paihangb.vue'),
        name: 'phb'
    },
    {
        path:'/mine',
        component:() => import('../views/Mine.vue'),
        name: 'mine'
    },
]


//实例化vue-router将路由配置作为选项传入
const router = new Router({
    routes,
    mode:"history",
    // // base:'/base',
    // linkActiveClass: "active"
})


//将vue-router实例对象公开
export default router