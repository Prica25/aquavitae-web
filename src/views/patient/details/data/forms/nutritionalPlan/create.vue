<template>
  <base-page
    title="Plano Nutricional"
    vertical-alignment="center"
    :breadcrumbs="breadcrumbs"
  >
    <template #right-header>
      <q-btn
        outline
        round
        color="negative"
        icon="fa-solid fa-xmark"
        @click="goBack"
        style="margin-right: 4px"
      />
      <q-btn
        outline
        round
        color="primary"
        icon="fa-solid fa-check"
        @click="save"
        style="margin-left: 4px"
      />
    </template>
    <template #content>
      <div style="width: 100%; min-width: 900px">
        <Details
          v-model="limits"
          :anthropometric-data="anthroData"
          :meals="meals"
          :personal-data="personalData"
        />
        <NumberMeals
          v-model:type="period"
          v-model:meals="numberOfMeals"
          v-model:validate-date="maxDate"
          :recommended-meals="getRecommendedNumberMeals()"
        />
        <MealCard v-model="meals[i]" v-for="(meal, i) in meals" />
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
import MealsOfPlanService from '@/services/MealsOfPlanService'
import type MealsOfPlan from '@/types/MealsOfPlan'
import NutritionalPlanService from '@/services/NutritionalPlanService'
import MealsOptionsService from '@/services/MealsOptionsService'

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
      itemList: [] as any[],
      period: undefined as string | undefined,
      maxDate: formatDate(new Date(Date.now() + 60 * 60 * 24 * 1000)),
      visibleDay: new Date(Date.now() + 60 * 60 * 24 * 1000),
      numberOfDays: 1,
      limits: {
        calories_limit: 0,
        proteins_limit: 0,
        lipids_limit: 0,
        carbohydrates_limit: 0,
      },
    }
  },
  async created() {
    this.personalData = (await PersonalDataService.show(this.user_id))
      .data[0] as PersonalData
    this.anthroData = (await AnthropometricDataService.showLast(this.user_id))
      .data.data[0] as AnthropometricData

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
            type_of_meal: null as string | null,
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

      return Math.round(
        (parseInt(bedtime_hours) * 60 +
          parseInt(bedtime_minutes) -
          (parseInt(wakeup_hours) * 60 + parseInt(wakeup_minutes))) /
          180
      )
    },
    async goBack() {
      if (await this.$confirmation('cancel')) {
        this.$router.back()
      }
    },
    async save() {
      if (await this.$confirmation('save')) {
        let nutritionalPlan
        const notif = this.$q.notify({
          group: false,
          spinner: true,
          message: 'A guardar...',
          position: 'bottom',
          timeout: 0,
        })
        try {
          for (let meal of this.meals) {
            const savedMeal = (
              await MealsOfPlanService.post({
                description: meal.description,
                end_time: meal.end_time,
                start_time: meal.start_time,
                type_of_meal: meal.type_of_meal,
              } as MealsOfPlan)
            ).data
            meal.id = savedMeal.id
          }

          let d = this.maxDate.split('/')
          let firstDay = formatDate(this.visibleDay, { showHour: false }).split(
            '/'
          )
          nutritionalPlan = (
            await NutritionalPlanService.post({
              period_limit: this.period,
              ...this.limits,
              validate_date: `${d[2]}-${d[1]}-${d[0]}`,
              active: true,
              meals_of_plan: this.meals.map((m) => ({
                meals_of_plan: m.id,
                meal_date: `${firstDay[2]}-${firstDay[1]}-${firstDay[0]}`,
              })),
              user: this.user_id,
            })
          ).data

          for (let meal of this.meals) {
            for (const option of meal.mealsOptions) {
              await MealsOptionsService.post({
                item: option.id,
                amount: option.amount,
                nutritional_plan: nutritionalPlan.id,
                meals_of_plan: meal.id,
              })
            }
          }

          notif({
            spinner: false,
            color: 'positive',
            icon: 'fa-solid fa-circle-check',
            message: 'Concluído',
            timeout: 500,
          })
          this.$router.back()
        } catch (err) {
          notif({
            spinner: false,
            color: 'negative',
            icon: 'fa-solid fa-circle-xmark',
            message: 'Algo inesperado aconteceu!',
            timeout: 1000,
          })

          if (nutritionalPlan.id) {
            NutritionalPlanService.delete(nutritionalPlan.id)
          }
          for (const meal of this.meals) {
            if (meal.id) {
              MealsOfPlanService.delete(meal.id)
            }
          }
          console.log(err)
        }
      }
    },
  },
})
</script>
