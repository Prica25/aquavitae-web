<template>
  <base-page title="Plano Nutricional">
    <template v-slot:content>
      <Details />
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

export default defineComponent({
  components: {
    Details,
    NumberMeals,
    MealCard,
  },
  data() {
    return {
      numberOfMeals: 4,
      meals: [],
    }
  },
  methods: {
    teste() {
      console.log(this.numberOfMeals, 'xxx')
    },
  },
})
</script>
