<template>
  <base-page
    title="Plano Nutricional"
    vertical-alignment="center"
    :breadcrumbs="breadcrumbs"
  >
    <template #content>
      <div style="width: 100%">
        <Details
          :anthropometric-data="anthroData"
          :food-list="foodList"
          :personal-data="personalData"
        />
        <NumberMeals
          v-model:type="period"
          v-model:meals="numberOfMeals"
          v-model:validate-date="maxDate"
          :recommended-meals="getRecommendedNumberMeals()"
        />
        <MealCard
          v-model="meals[i]"
          v-for="(meal, i) in meals"
          @update-meal="teste"
        />
      </div>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import Details from '@/components/nutricionalPlan/details.vue'
import NumberMeals from '@/components/nutricionalPlan/numberMeals.vue'
import MealCard from '@/components/nutricionalPlan/mealCard.vue'

import type AnthropometricData from '@/types/AnthropometricData'
import type PersonalData from '@/types/PersonalData'

import AnthropometricDataService from '@/services/AnthropometricDataService'
import PersonalDataService from '@/services/PersonalDataService'

import { formatDate } from '@/utils/index'

export default defineComponent({
  props: {
    user_id: {
      type: String,
      required: true,
    },
  },
  components: {
    Details,
    NumberMeals,
    MealCard,
  },
  data() {
    return {
      breadcrumbs: [] as any[],
      numberOfMeals: 1,
      meals: [] as any[],
      user: {},
      personalData: {} as PersonalData,
      anthroData: {} as AnthropometricData,
      mealData: [],
      foodList: [] as any[],
      period: undefined as string | undefined,
      maxDate: formatDate(new Date(Date.now() + 60 * 60 * 24 * 1000)),
      visibleDay: new Date(Date.now() + 60 * 60 * 24 * 1000),
      numberOfDays: 1,
    }
  },
  async created() {
    this.personalData = (await PersonalDataService.show(this.user_id))
      .data[0] as PersonalData

    this.numberOfMeals = this.getRecommendedNumberMeals()

    this.breadcrumbs.push(
      { label: 'Pacientes', icon: 'users', href: 'patient' },
      {
        label: `${this.personalData.first_name} ${this.personalData.last_name}`,
        href: 'menu-user',
        params: { user_id: this.user_id },
      },
      {
        label: 'Plano Nutricional',
        href: 'nutrition-plan',
        params: { user_id: this.user_id },
      }
    )
  },
  watch: {
    numberOfMeals() {
      if (this.meals.length > this.numberOfMeals) {
        this.meals = this.meals.slice(0, this.numberOfMeals)
      } else if (this.meals.length < this.numberOfMeals) {
        const needElements = this.numberOfMeals - this.meals.length
        this.meals = [
          ...this.meals,
          ...Array.from({ length: needElements }, () => ({
            start_time: null as string | null,
            end_time: null as string | null,
            description: '',
            mealsOptions: [],
          })),
        ]
      }

      this.calculateHours()
    },
    maxDate() {
      let tomorrow = new Date()
      tomorrow.setDate(tomorrow.getDate() + 1)
      let firstDay = new Date(
        tomorrow.getFullYear(),
        tomorrow.getMonth(),
        tomorrow.getDate()
      )
      let d = this.maxDate.split('/')
      let lastDay = new Date(parseInt(d[2]), parseInt(d[1]) - 1, parseInt(d[0]))
      this.numberOfDays =
        (lastDay.getTime() - firstDay.getTime()) / 1000 / 60 / 60 / 24 + 1
    },
  },
  async mounted() {
    this.anthroData = (await AnthropometricDataService.showLast(this.user_id))
      .data.data[0] as AnthropometricData
  },
  methods: {
    calculateHours() {
      const { hours, minutes } =
        /^(?<hours>[0-9]{2}):(?<minutes>[0-9]{2})/.exec(
          this.personalData.wake_up
        )?.groups || {}

      const { hours: bedtime_hours, minutes: bedtime_minutes } =
        /^(?<hours>[0-9]{2}):(?<minutes>[0-9]{2})/.exec(
          this.personalData.bedtime
        )?.groups || {}

      const mealsInterval =
        (parseInt(bedtime_hours) * 60 +
          parseInt(bedtime_minutes) -
          (parseInt(hours) * 60 + parseInt(minutes))) /
        this.meals.length

      for (const [i, meal] of this.meals.entries() as IterableIterator<
        [number, any]
      >) {
        const startMinutes =
          parseInt(hours) * 60 + parseInt(minutes) + mealsInterval * i
        const hour = startMinutes / 60
        meal.start_time = `${Math.floor(hour)
          .toString()
          .padStart(2, '0')}:${Math.round((hour - Math.floor(hour)) * 60)
          .toString()
          .padStart(2, '0')}`
        meal.end_time = `${Math.floor(hour + 2)
          .toString()
          .padStart(2, '0')}:${Math.round(
          (hour + 2 - Math.floor(hour + 2)) * 60
        )
          .toString()
          .padStart(2, '0')}`
      }
    },
    getRecommendedNumberMeals() {
      const { hours: wakeup_hours, minutes: wakeup_minutes } =
        /^(?<hours>[0-9]{2}):(?<minutes>[0-9]{2})/.exec(
          this.personalData.wake_up
        )?.groups || {}

      const { hours: bedtime_hours, minutes: bedtime_minutes } =
        /^(?<hours>[0-9]{2}):(?<minutes>[0-9]{2})/.exec(
          this.personalData.bedtime
        )?.groups || {}

      return (
        (parseInt(bedtime_hours) * 60 +
          parseInt(bedtime_minutes) -
          (parseInt(wakeup_hours) * 60 + parseInt(wakeup_minutes))) /
        180
      )
    },
    teste(list: any) {
      this.foodList = [...this.foodList, ...list]
    },
  },
})
</script>
