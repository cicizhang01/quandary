import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'
import { authGuard } from "../auth/authGuard";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('../views/Form.vue')
    },
    {
      path: '/quandary/:id',
      name: 'quandarySingle',
      component: () => import('../views/QuandarySingle.vue'),
      beforeEnter: authGuard
    }
  ]
})
