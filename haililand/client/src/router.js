import Vue from 'vue'
import Region from './views/Region.vue'
import Router from 'vue-router'
import Login from './views/Login.vue'
import SystemUser from './views/SystemUser.vue'
import System from './views/System.vue'
import SystemEadUser from './views/SystemEadUser.vue'
import index from "./views/index.vue"
import allProd from "./views/allProd.vue"
import prodInfo from "./views/prodInfo.vue"
import about from "./views/about.vue"
import Cart from './views/Cart.vue'
import Order from './views/Order.vue'


Vue.use(Router)

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [{
            path: '/',
            // name: 'home',
            component: index
        }, ,
        {
            path: '/allProd',
            component: allProd
        },

        {
            path: '/prodInfo',
            component: prodInfo
        }, {
            path: '/login',
            // name: 'home',
            component: Login
        },
        {
            path: '/region',
            // name: 'home',
            component: Region
        }, {
            path: '/systemuser',
            // name: 'home',
            component: SystemUser
        },
        {
            path: '/system',
            // name: 'home',
            component: System
        },
        {
            path: '/systemeaduser',
            name: 'systemeaduser',
            component: SystemEadUser
        },
        {
            path: '/about',
            name: 'systemeaduser',
            component: about
        },
        {
            path: '/cart',
            // name: 'home',
            component: Cart
        },
        {
            path: '/order',
            // name: 'home',
            component: Order
        }

        // {
        //     path: '/about',
        //     // name: 'about',
        //     // route level code-splitting
        //     // this generates a separate chunk (about.[hash].js) for this route
        //     // which is lazy-loaded when the route is visited.
        //     component: () =>
        //         import ( /* webpackChunkName: "about" */ './views/About.vue')
        // }
    ]
})