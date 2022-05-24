import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/dashboard/index.vue'
import AppointmentView from '@/views/appointment/list.vue'
import PatientView from '@/views/patient/list.vue'
import FoodView from '@/views/food/list.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', redirect: { name: 'dashboard' } },
    { path: '/login', redirect: { name: 'dashboard' } },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/appointment/list',
      name: 'appointment',
      component: AppointmentView,
    },
    {
      path: '/patient/list',
      name: 'patient',
      component: PatientView,
    },
    {
      path: '/food/list',
      name: 'food',
      component: FoodView,
    },
  ],
})

export default router
