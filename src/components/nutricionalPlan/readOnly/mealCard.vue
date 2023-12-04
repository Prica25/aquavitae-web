<template>
  <hr style="border: none; border-bottom: thin solid rgba(0, 0, 0, 0.12)" />
  <q-card class="q-pa-md meal-card box-default" style="width: 100%">
    <div class="row meal">
      <span style="font-size: 16px">
        {{ mealOfPlan.description }}
      </span>
      <q-separator vertical style="margin: 0 8px" />
      {{ mealOfPlan.type_of_meal.description }}
      <q-space />
      <span style="margin: 0 4px">
        <q-icon
          name="fa-solid fa-hourglass-start"
          color="primary"
          size="18px"
        />
        {{ formatHour(mealOfPlan.start_time) }}
      </span>
      <span style="margin: 0 4px">
        <q-icon name="fa-solid fa-hourglass-end" color="negative" size="18px" />
        {{ formatHour(mealOfPlan.end_time) }}
      </span>
    </div>
  </q-card>
  <custom-table
    :rows="items"
    :columns="columns"
    no-data-label="Sem Registos"
    disable-tooltip
    hide-headers
    expandable-rows
    style="padding: 0 12px"
  >
    <template v-slot:exandable-area="{ row }">
      <custom-table
        :rows="row.item.foods"
        :columns="foodColumns"
        disable-tooltip
        filled
        :custom-props="{ parent_id: row.id }"
      />
    </template>
  </custom-table>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import Autocomplete from '@/components/misc/autocompleteSearch.vue'
import CustomTable from '@/components/misc/CustomTable.vue'

import ItemService from '@/services/ItemService'
import TypeOfMealService from '@/services/TypeOfMealService'
import MealsOptionsService from '@/services/MealsOptionsService'
import DiaryService from '@/services/DiaryService'

import type Food from '@/types/Food'
import type TypeOfMeal from '@/types/TypeOfMeal'

import { formatDate } from '@/utils'

export default defineComponent({
  components: {
    Autocomplete,
    CustomTable,
  },
  emits: ['update:modelValue'],
  props: ['modelValue', 'visibleDay', 'type'],
  data() {
    return {
      types: {
        MealsOptions: MealsOptionsService,
        Diary: DiaryService,
      },
      search: null as string | null,
      item_id: undefined as string | undefined,
      items: [] as any[],
      date: null,
      columns: [
        {
          name: 'description',
          label: 'Descrição',
          field: (row: any) => row.item.description,
          align: 'left',
          sortable: false,
        },
      ],
      foodColumns: [
        {
          name: 'description',
          label: 'Descrição',
          field: (row: any) => row.food.description,
          align: 'left',
          size: '30%',
          sortable: false,
        },
        {
          name: 'amount',
          label: 'Quantidade (g)',
          field: (row: any) => this.calculateAmount(row),
          align: 'center',
          style: 'font-weight: bold;',
          sortable: false,
        },
        {
          name: 'proteins',
          label: 'Proteína (g)',
          field: (row: any) => this.calculateGrams(row, 'proteins'),
          align: 'center',
          style: 'font-weight: bold;',
          sortable: false,
        },
        {
          name: 'lipids',
          label: 'Lípidos (g)',
          field: (row: any) => this.calculateGrams(row, 'lipids'),
          align: 'center',
          style: 'font-weight: bold;',
          sortable: false,
        },
        {
          name: 'carbohydrates',
          label: 'Hidratos de Carbono (g)',
          field: (row: any) => this.calculateGrams(row, 'carbohydrates'),
          align: 'center',
          style: 'font-weight: bold;',
          sortable: false,
        },
        {
          name: 'energy_value',
          label: 'Energia (kcal)',
          field: (row: any) => this.calculateGrams(row, 'energy_value'),
          align: 'center',
          style: 'font-weight: bold;',
          sortable: false,
        },
      ],
    }
  },
  computed: {
    mealOfPlan: {
      get() {
        if (
          !this.modelValue.mealsOptions &&
          this.modelValue.has_meals.find(
            (hm) => hm.meal_date === this.visibleDay
          )
        ) {
          this.updateMealOptions()
        }
        return this.modelValue
      },
      set(val: any) {
        return this.$emit('update:modelValue', val)
      },
    },
  },
  methods: {
    async updateMealOptions() {
      const id = this.modelValue.has_meals.find(
        (hm) => hm.meal_date === this.visibleDay
      )?.id
      if (id) {
        let result = (
          await this.types[this.type].index(
            1,
            10,
            'amount:DESC',
            ['amount', 'item'],
            `nutritional_plan_has_meal_id:${id}`
          )
        ).data

        this.items = result.data
        this.mealOfPlan = { ...this.mealOfPlan, mealsOptions: this.items }
      } else {
        this.items = []
        this.mealOfPlan = { ...this.mealOfPlan, mealsOptions: this.items }
      }
    },
    calculateAmount(row: any) {
      const item = this.items.find((item) => item.id === row.parent_id)
      return (item?.amount || 0) * row.amount_grams
    },
    calculateGrams(row: any, key: string) {
      return Math.round((row.food[key] * this.calculateAmount(row)) / 100)
    },
    view(id: string): void {
      alert('Mostrar dados do alimento')
    },
    formatHour(value: string) {
      return formatDate(value, { hideSeconds: true })
    },
  },
  watch: {
    visibleDay() {
      this.updateMealOptions()
    },
  },
})
</script>
<style scoped>
:deep(.header-table) {
  background: var(--q-primary);
  color: white;
}
.meal-card {
  margin: 20px 0 0 0;
}
.meal {
  align-items: center;
}
.meal > span {
  color: #646464;
  font-weight: bold;
}
</style>
