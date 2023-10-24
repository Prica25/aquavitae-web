import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: { name: 'patient' } },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/user/login.vue'),
      meta: { layout: 'Clean' },
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
      path: '/food/new',
      name: 'food-create-form',
      component: () => import('@/views/food/forms/create.vue'),
    },
    {
      path: '/meal/list',
      name: 'meal',
      component: () => import('@/views/meals/list.vue'),
    },
    {
      path: '/meal/new',
      name: 'meal-create-form',
      component: () => import('@/views/meals/forms/create.vue'),
    },
    // {
    //   path: '/menu-user/meal/:user_id',
    //   name: 'meal',
    //   component: () => import('@/views/patient/details/meal/form.vue'),
    //   props: true,
    // },
    {
      path: '/menu-user/personal-data/:user_id',
      name: 'personal-data',
      component: () => import('@/views/patient/details/data/personalData.vue'),
      props: true,
    },
    {
      path: '/menu-user/anthropometric-data/new/:user_id',
      name: 'anthropometric-data-create-form',
      component: () =>
        import(
          '@/views/patient/details/data/forms/anthropometricData/create.vue'
        ),
      props: true,
    },
    {
      path: '/menu-user/anthropometric-data/:user_id',
      name: 'anthropometric-data',
      component: () =>
        import('@/views/patient/details/data/anthropometricData.vue'),
      props: true,
    },
    {
      path: '/menu-user/:user_id',
      name: 'menu-user',
      component: () => import('@/views/patient/details/main.vue'),
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
    {
      path: '/management/appointment-goal/new',
      name: 'appointment-goals-create-form',
      component: () =>
        import('@/views/settings/appointmentGoal/forms/create.vue'),
    },
    {
      path: '/management/appointment-goal',
      name: 'appointment-goal',
      component: () => import('@/views/settings/appointmentGoal/list.vue'),
    },
    {
      path: '/management/user/new',
      name: 'user-create-form',
      component: () => import('@/views/settings/user/forms/create.vue'),
    },
    {
      path: '/management/user',
      name: 'user',
      component: () => import('@/views/settings/user/list.vue'),
    },
  ],
})

export default router
