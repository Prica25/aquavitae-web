<template>
  <base-page title="Plano Nutricional">
    <template v-slot:content>
      <Details :anthropometric-data="anthroData" />
      <NumberMeals v-model="numberOfMeals" @update:modelValue="teste" />
      <MealCard
        v-model="meals[index]"
        v-for="index in numberOfMeals"
        :key="`meal-${index}`"
      />
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import Details from '@/components/nutricionalPlan/details.vue'
import NumberMeals from '@/components/nutricionalPlan/numberMeals.vue'
import MealCard from '@/components/nutricionalPlan/mealCard.vue'

import type AnthropometricData from '@/types/AnthropometricData'

import AnthropometricDataService from '@/services/AnthropometricDataService.js'

export default defineComponent({
  components: {
    Details,
    NumberMeals,
    MealCard,
  },
  data() {
    return {
      numberOfMeals: 1,
      meals: [],
      user: {},
      personalData: {},
      anthroData: {} as AnthropometricData,
    }
  },
  async mounted() {
    this.anthroData = (
      await AnthropometricDataService.show(this.$route.params.user_id as string)
    ).data.data[0] as AnthropometricData

    console.log(this.anthroData)
  },
  methods: {
    teste() {
      console.log(this.numberOfMeals, 'xxx')
    },
  },
})
</script>
