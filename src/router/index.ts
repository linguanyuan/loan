/*
 * @Description: 这是***页面（组件）
 * @Date: 2022-12-26 14:46:59
 * @Author: linguanyuan
 * @LastEditors: linguanyuan
 * @LastEditTime: 2023-02-16 17:56:56
 */
import * as VueRouter from 'vue-router'
// import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/loginFrom/index.vue'

const router = VueRouter.createRouter({
  // history: createWebHashHistory(import.meta.env.BASE_URL),
  history: VueRouter.createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/loginFrom/index.vue')
    }
  ]
})

export default router
