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
        <NumberMeals v-model="numberOfMeals" @update:modelValue="teste" />
        <MealCard
          v-model="meals[index]"
          v-for="index in numberOfMeals"
          :key="`meal-${index}`"
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
      meals: [],
      user: {},
      personalData: {} as PersonalData,
      anthroData: {} as AnthropometricData,
      mealData: [],
      foodList: [] as any[],
    }
  },
  async created() {
    let personalData = (await PersonalDataService.show(this.user_id))
      .data[0] as PersonalData
    this.breadcrumbs.push(
      { label: 'Pacientes', icon: 'users', href: 'patient' },
      {
        label: `${personalData.first_name} ${personalData.last_name}`,
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
  async mounted() {
    this.anthroData = (await AnthropometricDataService.showLast(this.user_id))
      .data.data[0] as AnthropometricData
    this.personalData = (await PersonalDataService.show(this.user_id)).data[0]
  },
  methods: {
    teste(list: any) {
      this.foodList = [...this.foodList, ...list]
    },
  },
})
</script>
