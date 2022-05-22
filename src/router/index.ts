import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/dashboard/index.vue'
import ApointmentView from '@/views/dashboard/index.vue'
import PatientView from '@/views/dashboard/index.vue'
import FoodView from '@/views/food/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/apointment',
      name: 'apointment',
      component: ApointmentView,
    },
    {
      path: '/patient',
      name: 'patient',
      component: PatientView,
    },
    {
      path: '/food',
      name: 'food',
      component: FoodView,
    },
  ],
})

export default router
