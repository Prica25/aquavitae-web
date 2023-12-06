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
      path: '/profile',
      name: 'profile',
      component: () => import('@/views/user/forms/update.vue'),
    },
    {
      path: '/appointment/list',
      name: 'appointment',
      component: () => import('@/views/appointment/list.vue'),
    },
    {
      path: '/appointment/new',
      name: 'appointment-create-form',
      component: () => import('@/views/appointment/forms/create.vue'),
    },
    {
      path: '/appointment/update/:id',
      name: 'appointment-update-form',
      component: () => import('@/views/appointment/forms/update.vue'),
      props: true,
    },
    {
      path: '/appointment-menu/biochemical-data/update/:id',
      name: 'biochemical-data-update-form',
      component: () =>
        import('@/views/appointment/menu/forms/biochemicalData/update.vue'),
      props: true,
    },
    {
      path: '/appointment-menu/biochemical-data/new/:appointment_id',
      name: 'biochemical-data-create-form',
      component: () =>
        import('@/views/appointment/menu/forms/biochemicalData/create.vue'),
      props: true,
    },
    {
      path: '/appointment-menu/biochemical-data/:appointment_id',
      name: 'biochemical-data',
      component: () => import('@/views/appointment/menu/biochemicalData.vue'),
      props: true,
    },
    {
      path: '/appointment-menu/:appointment_id',
      name: 'appointment-menu',
      component: () => import('@/views/appointment/menu/main.vue'),
      props: true,
    },
    {
      path: '/patient/list',
      name: 'patient',
      component: () => import('@/views/patient/list.vue'),
    },
    {
      path: '/patient/new',
      name: 'patient-create-form',
      component: () => import('@/views/patient/forms/create.vue'),
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
      path: '/food/update/:id',
      name: 'food-update-form',
      component: () => import('@/views/food/forms/update.vue'),
      props: true,
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
    {
      path: '/meal/update/:id',
      name: 'meal-update-form',
      component: () => import('@/views/meals/forms/update.vue'),
      props: true,
    },
    {
      path: '/menu-user/nutritional-plan/new/:user_id',
      name: 'nutritional-plan-create-form',
      component: () =>
        import('@/views/patient/details/data/forms/nutritionalPlan/create.vue'),
      props: true,
    },
    {
      path: '/menu-user/nutritional-plan/:user_id',
      name: 'nutritional-plan',
      component: () =>
        import('@/views/patient/details/data/nutritionalPlan.vue'),
      props: true,
    },
    {
      path: '/menu-user/diary/:user_id',
      name: 'diary',
      component: () => import('@/views/patient/details/data/diary.vue'),
      props: true,
    },
    {
      path: '/menu-user/personal-data/update/:id',
      name: 'personal-data-update-form',
      component: () =>
        import('@/views/patient/details/data/forms/personalData/update.vue'),
      props: true,
    },
    {
      path: '/menu-user/personal-data/:user_id',
      name: 'personal-data',
      component: () => import('@/views/patient/details/data/personalData.vue'),
      props: true,
    },
    {
      path: '/menu-user/anthropometric-data/update/:id',
      name: 'anthropometric-data-update-form',
      component: () =>
        import(
          '@/views/patient/details/data/forms/anthropometricData/update.vue'
        ),
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
      path: '/menu-user/antecedent/update/:id',
      name: 'antecedent-update-form',
      component: () =>
        import('@/views/patient/details/data/forms/antecedent/update.vue'),
      props: true,
    },
    {
      path: '/menu-user/antecedent/new/:user_id',
      name: 'antecedent-create-form',
      component: () =>
        import('@/views/patient/details/data/forms/antecedent/create.vue'),
      props: true,
    },
    {
      path: '/menu-user/antecedent/:user_id',
      name: 'antecedent',
      component: () => import('@/views/patient/details/data/antecedent.vue'),
      props: true,
    },
    {
      path: '/menu-user/specificity/update/:id',
      name: 'specificity-update-form',
      component: () =>
        import('@/views/patient/details/data/forms/specificity/update.vue'),
      props: true,
    },
    {
      path: '/menu-user/specificity/new/:user_id',
      name: 'specificity-create-form',
      component: () =>
        import('@/views/patient/details/data/forms/specificity/create.vue'),
      props: true,
    },
    {
      path: '/menu-user/specificity/:user_id',
      name: 'specificity',
      component: () => import('@/views/patient/details/data/specificity.vue'),
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
      path: '/management/type-meals/update/:id',
      name: 'type-meals-update-form',
      component: () => import('@/views/settings/typeOfMeals/forms/update.vue'),
      props: true,
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
      path: '/management/activity-level/update/:id',
      name: 'activity-level-update-form',
      component: () =>
        import('@/views/settings/activityLevel/forms/update.vue'),
      props: true,
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
      path: '/management/appointment-goal/update/:id',
      name: 'appointment-goals-update-form',
      component: () =>
        import('@/views/settings/appointmentGoal/forms/update.vue'),
      props: true,
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
      path: '/management/antecedent-type/update/:id',
      name: 'antecedent-type-update-form',
      component: () =>
        import('@/views/settings/antecedentType/forms/update.vue'),
      props: true,
    },
    {
      path: '/management/antecedent-type/new',
      name: 'antecedent-type-create-form',
      component: () =>
        import('@/views/settings/antecedentType/forms/create.vue'),
    },
    {
      path: '/management/antecedent-type',
      name: 'antecedent-type',
      component: () => import('@/views/settings/antecedentType/list.vue'),
    },
    {
      path: '/management/specificity-type/update/:id',
      name: 'specificity-type-update-form',
      component: () =>
        import('@/views/settings/specificityType/forms/update.vue'),
      props: true,
    },
    {
      path: '/management/specificity-type/new',
      name: 'specificity-type-create-form',
      component: () =>
        import('@/views/settings/specificityType/forms/create.vue'),
    },
    {
      path: '/management/specificity-type',
      name: 'specificity-type',
      component: () => import('@/views/settings/specificityType/list.vue'),
    },
    {
      path: '/management/user/update/:id',
      name: 'user-update-form',
      component: () => import('@/views/settings/user/forms/update.vue'),
      props: true,
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
