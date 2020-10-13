import Vue from 'vue'
import VueRouter from 'vue-router'

import { ifAuthenticated } from "./guard";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/Dashboard.vue'),
    name: "home",
    redirect: "dashboard",
    children: [
      {
        beforeEnter: ifAuthenticated,
        path: 'dashboard',
        name: 'dashboard',
        component: () => import('../views/Dashboard.vue')
      }
    ],
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/Register.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },

]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
