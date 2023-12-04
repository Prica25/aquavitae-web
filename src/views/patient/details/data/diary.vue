<template>
  <base-page
    title="Plano Nutricional"
    vertical-alignment="center"
    :breadcrumbs="breadcrumbs"
  >
    <template #content>
      <div v-if="nutritionalPlan" style="width: 100%; min-width: 900px">
        <Details :nutritional-plan="nutritionalPlan" :meals="meals" />
        <NumberMeals
          v-model="visibleDay"
          :type="period"
          :meals="numberOfMeals"
          :validate-date="maxDate"
          :dates="availableDates"
        />
        <MealCard
          v-model="meals[i]"
          v-for="(meal, i) in meals"
          :visible-day="visibleDay"
          type="Diary"
        />
      </div>
      <div
        v-else
        class="row box-default"
        style="width: 100%; padding: 12px; justify-content: center"
      >
        <q-icon
          name="fa-solid fa-warning"
          color="negative"
          size="18px"
          style="margin-right: 12px"
        />
        <span> Sem planos nutricionais </span>
      </div>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import Details from '@/components/nutricionalPlan/readOnly/details.vue'
import NumberMeals from '@/components/nutricionalPlan/readOnly/numberMeals.vue'
import MealCard from '@/components/nutricionalPlan/readOnly/mealCard.vue'

import type PersonalData from '@/types/PersonalData'
import type NutritionalPlan from '@/types/NutritionalPlan'

import PersonalDataService from '@/services/PersonalDataService'
import NutritionalPlanService from '@/services/NutritionalPlanService'
import NutritionalPlanHasMealService from '@/services/NutritionalPlanHasMealService'
import RecommendationSystemService from '@/services/RecommendationSystemService'

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
      personalData: {} as PersonalData,
      period: undefined as string | undefined,
      maxDate: formatDate(new Date(Date.now() + 60 * 60 * 24 * 1000)),
      visibleDay: '',
      availableDates: [],
      nutritionalPlan: null as NutritionalPlan | null,
    }
  },
  async created() {
    this.personalData = (await PersonalDataService.show(this.user_id))
      .data[0] as PersonalData

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

    const nutitionalPlan = (
      await NutritionalPlanService.index(
        1,
        1,
        'validate_date:DESC',
        [
          'validate_date',
          'calories_limit',
          'proteins_limit',
          'lipids_limit',
          'carbohydrates_limit',
          'period_limit',
          'active',
        ],
        `user_id:${this.user_id}`
      )
    ).data

    this.nutritionalPlan = nutitionalPlan.data[0]
    if (this.nutritionalPlan) {
      this.maxDate = formatDate(this.nutritionalPlan.validate_date, {
        showHour: false,
      })
      this.period = this.nutritionalPlan.period_limit

      const nutritional_plan_id = nutitionalPlan.data[0].id

      let meals = (
        await NutritionalPlanHasMealService.index(
          1,
          1,
          'meal_date:ASC',
          ['meal_date', 'meals_of_plan'],
          `nutritional_plan_id:${nutritional_plan_id}`
        )
      ).data

      meals = (
        await NutritionalPlanHasMealService.index(
          1,
          meals.count,
          'meal_date:ASC',
          ['meal_date', 'meals_of_plan'],
          `nutritional_plan_id:${nutritional_plan_id}`
        )
      ).data

      meals = meals.data.reduce((pv: any, cv: any) => {
        if (this.availableDates.indexOf(cv.meal_date) === -1)
          this.availableDates.push(cv.meal_date)

        let obj = pv.find((v: any) => v.id === cv.meals_of_plan.id)
        if (obj) {
          obj.has_meals.push({ id: cv.id, meal_date: cv.meal_date })
        } else {
          pv.push({
            ...cv.meals_of_plan,
            has_meals: [{ id: cv.id, meal_date: cv.meal_date }],
          })
        }
        return pv
      }, [])

      this.availableDates.sort()
      this.visibleDay = this.availableDates[0]
      this.meals = meals
      this.numberOfMeals = this.meals.length
    }
  },
  methods: {
    add() {
      this.$router.push({
        name: 'nutritional-plan-create-form',
        params: { user_id: this.user_id },
      })
    },
    async completeNutritionalPlan() {
      if (await this.$confirmation('complete')) {
        try {
          await RecommendationSystemService.complete(
            this.user_id,
            this.nutritionalPlan.id
          )
        } catch (err) {
          console.log(err)
        }
      }
    },
  },
})
</script>
