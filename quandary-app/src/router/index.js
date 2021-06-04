import Vue from 'vue'
import Router from 'vue-router'
import { authGuard } from "../auth/authGuard";

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'quandary',
      component: () => import('../views/Home.vue'),
      // beforeEnter: authGuard
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/About.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/Profile.vue')
    },
    {
      path: '/form',
      name: 'form',
      component: () => import('../views/Form.vue')
    },
    {
      path: '/topic/:topic',
      name: 'quandary_topic',
      component: () => import('../views/Home.vue'),
    },
    {
      path: '/:id',
      name: 'quandarySingle',
      component: () => import('../views/QuandarySingle.vue'),
      beforeEnter: authGuard
    },
    {
      path: '/'
    }
  ]
})
