<template>
  <base-page title="Plano Nutricional" display="block" direction="column">
    <template #content>
      <Details :anthropometric-data="anthroData" />
      <NumberMeals v-model="numberOfMeals" @update:modelValue="teste" />
      <MealCard
        v-model="meals[index]"
        v-for="index in numberOfMeals"
        :key="`meal-${index}`"
        @update-meal="teste"
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
import type Food from '@/types/Food'

import AnthropometricDataService from '@/services/AnthropometricDataService'

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
      numberOfMeals: 1,
      meals: [],
      user: {},
      personalData: {},
      anthroData: {} as AnthropometricData,
      mealData: [],
    }
  },
  async mounted() {
    this.anthroData = (
      await AnthropometricDataService.show(this.$route.params.user_id as string)
    ).data.data[0] as AnthropometricData
  },
  methods: {
    teste(list: Food[]) {
      console.log(list)
    },
  },
})
</script>
