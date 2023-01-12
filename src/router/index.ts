import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: { name: 'dashboard' } },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/user/login.vue'),
      meta: { layout: 'Clean' },
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('@/views/dashboard/index.vue'),
    },
    {
      path: '/appointment/list',
      name: 'appointment',
      component: () => import('@/views/appointment/list.vue'),
    },
    {
      path: '/patient/list',
      name: 'patient',
      component: () => import('@/views/patient/list.vue'),
    },
    {
      path: '/nutrition-plan/view/:user_id',
      name: 'nutrition-plan',
      component: () => import('@/views/nutrition/view.vue'),
    },
    {
      path: '/food/list',
      name: 'food',
      component: () => import('@/views/food/list.vue'),
    },
    {
      path: '/menu-user/:user_id',
      name: 'menu-user',
      component: () => import('@/views/patient/settings/main.vue'),
    },
    {
      path: '/menu-user/meal/:user_id',
      name: 'meal',
      component: () => import('@/views/patient/settings/meal/form.vue'),
    },
    {
      path: '/management',
      name: 'management',
      component: () => import('@/views/settings/main.vue'),
    },
  ],
})

export default router
