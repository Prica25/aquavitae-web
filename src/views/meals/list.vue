<template>
  <List
    title="Receitas"
    type="Item"
    add-button
    add-button-text="Adicionar Receita"
    table-sort-by="description"
    filter-column="description"
    :columns="columns"
    create-form="meal-create-form"
    :db-columns="dbColumns"
  >
  </List>
  <q-dialog v-model="mealFoodDetails">
    <q-card style="width: 60vw; max-width: 60vw; background: #f5f5f5">
      <div style="padding: 12px">
        <custom-table
          ref="table"
          v-model:pagination="disablePagination"
          :rows="foods"
          :columns="foodsColumns"
          :loading="false"
        />
      </div>

      <q-card-actions align="center" style="padding: 12px">
        <q-btn label="Fechar" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent, h } from 'vue'

import TypeOfMealService from '@/services/TypeOfMealService.js'

import type TypeOfMeal from '@/types/TypeOfMeal'
import type FoodCantEatAt from '@/types/FoodCantEatAt'

import List from '@/components/misc/List.vue'
import CustomTable from '@/components/misc/CustomTable.vue'

export default defineComponent({
  components: {
    List,
    CustomTable,
  },
  data() {
    return {
      disablePagination: false,
      mealFoodDetails: false,
      foods: [] as any[],
      dbColumns: ['description', 'foods', 'can_eat_at'],
      foodsColumns: [
        {
          name: 'food',
          label: 'Alimento',
          field: (row: any) => row.food.description,
          size: '80%',
        },
        {
          name: 'amount_grams',
          label: 'Quantidade (g | ml)',
          field: 'amount_grams',
          size: '20%',
        },
      ],
      columns: [
        {
          name: 'description',
          label: 'Descrição',
          field: 'description',
          size: '50%',
        },
      ],
    }
  },
  async mounted() {
    let types = (await TypeOfMealService.index(1, 10, 'description:DESC')).data
      .data
    for (const type of types) {
      this.columns.push({
        name: type.description,
        label: type.description,
        field: (row: any) => this.createCheckIcon(row, type),
        align: 'center',
      })
    }
    this.columns.push({
      name: 'foods',
      label: 'Alimentos',
      field: this.createViewBtn,
      align: 'center',
    })
  },
  methods: {
    openList(row: any) {
      this.foods = row.foods
      this.mealFoodDetails = true
      console.log(this.foods)
    },
    createCheckIcon(row: any, type: TypeOfMeal) {
      const index = row.can_eat_at.findIndex(
        (cea: FoodCantEatAt) => cea.type_of_meal === type.id
      )
      return h('i', {
        class:
          index !== -1 ? 'fa-solid fa-square-check' : 'fa-regular fa-square',
        style:
          index !== -1
            ? 'color: var(--q-primary); font-size: 20px'
            : 'font-size: 20px',
      })
    },
    createViewBtn(row: any) {
      return h(
        'div',
        {
          class: 'list-view-btn',
          onClick: () => this.openList(row),
        },
        [
          'Ver Lista',
          h('i', {
            class: 'fa-solid fa-eye',
            style: 'margin-left: 5px;',
          }),
        ]
      )
    },
  },
})
</script>
<style>
.list-view-btn:hover {
  color: var(--q-primary);
}
</style>
