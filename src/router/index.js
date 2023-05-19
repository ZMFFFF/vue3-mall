import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      alias: "/home",
      name: 'home',
      component: Home,
      redirect: "/home/default",
      children: [
        {
          path: 'default',
          name: 'default',
          component: () => import('../views/Default.vue')
        },
        {
          path: 'user',
          name: 'user',
          component: () => import('../views/User.vue')
        },
        {
          path: 'role',
          name: 'role',
          component: () => import('../views/Role.vue')
        },
        {
          path: 'right',
          name: 'right',
          component: () => import('../views/Right.vue')
        },
        {
          path: 'goods',
          name: 'goods',
          component: () => import('../views/Goods.vue')
        },
        {
          path: 'param',
          name: 'param',
          component: () => import('../views/Param.vue')
        },
        {
          path: 'category',
          name: 'category',
          component: () => import('../views/Category.vue')
        },
        {
          path: 'order',
          name: 'order',
          component: () => import('../views/Order.vue')
        },
        {
          path: 'report',
          name: 'report',
          component: () => import('../views/Report.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'notFound',
      component: () => import('../views/NotFound.vue')
    }
  ]
})

export default router
