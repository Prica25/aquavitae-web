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
      props: true,
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
      props: true,
    },
    {
      path: '/menu-user/meal/:user_id',
      name: 'meal',
      component: () => import('@/views/patient/settings/meal/form.vue'),
      props: true,
    },
    {
      path: '/management',
      name: 'management',
      component: () => import('@/views/settings/main.vue'),
    },
    {
      path: '/management/type-meals/new',
      name: 'type-meals-create-form',
      component: () => import('@/views/settings/typeOfMeals/forms/create.vue'),
    },
    {
      path: '/management/type-meals',
      name: 'type-meals',
      component: () => import('@/views/settings/typeOfMeals/list.vue'),
    },
    {
      path: '/management/activity-level/new',
      name: 'activity-level-create-form',
      component: () =>
        import('@/views/settings/activityLevel/forms/create.vue'),
    },
    {
      path: '/management/activity-level',
      name: 'activity-level',
      component: () => import('@/views/settings/activityLevel/list.vue'),
    },
  ],
})

export default router
