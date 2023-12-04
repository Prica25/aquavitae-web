<template>
  <hr style="border: none; border-bottom: thin solid rgba(0, 0, 0, 0.12)" />
  <q-card class="q-pa-md meal-card box-default" style="width: 100%">
    <div class="row meal">
      <q-input
        outlined
        dense
        label="Descrição"
        v-model="mealOfPlan.description"
        @update:model-value="mealOfPlan = { ...mealOfPlan }"
        style="width: 200px"
      ></q-input>
      <q-separator vertical style="margin: 0 8px" />
      <autocomplete
        v-model="mealOfPlan.type_of_meal"
        @update:model-value="mealOfPlan = { ...mealOfPlan }"
        type="TypeOfMeal"
        value-key="id"
        label-key="description"
        label="Tipo de Refeição"
        clearable
        style="width: 200px"
      />

      <q-input
        outlined
        dense
        v-model="mealOfPlan.start_time"
        @update:model-value="mealOfPlan = { ...mealOfPlan }"
        mask="##:##"
        style="width: 60px; margin-left: 8px"
      >
        <q-popup-proxy
          transition-show="scale"
          transition-hide="scale"
          :offset="[91, 12]"
        >
          <q-time
            v-model="mealOfPlan.start_time"
            mask="HH:mm"
            minimal
            format24h
          />
        </q-popup-proxy>
      </q-input>
      <q-input
        outlined
        dense
        v-model="mealOfPlan.end_time"
        @update:model-value="mealOfPlan = { ...mealOfPlan }"
        mask="##:##"
        style="width: 60px; margin-left: 8px"
      >
        <q-popup-proxy
          transition-show="scale"
          transition-hide="scale"
          :offset="[91, 12]"
        >
          <q-time
            v-model="mealOfPlan.end_time"
            mask="HH:mm"
            minimal
            format24h
          />
        </q-popup-proxy>
      </q-input>
      <q-space />
      <autocomplete
        v-model="item_id"
        @update:model-value="addItem"
        type="Item"
        value-key="id"
        label-key="description"
        label="Procurar Receita..."
        style="width: 200px"
      />
    </div>
  </q-card>
  <custom-table
    :rows="items"
    :columns="columns"
    no-data-label="Sem Receitas Selecionadas"
    disable-tooltip
    hide-headers
    expandable-rows
  >
    <template v-slot:exandable-area="{ row }">
      <custom-table
        :rows="row.foods"
        :columns="foodColumns"
        disable-tooltip
        filled
        :custom-props="{ parent_id: row.id }"
      />
    </template>
    <template v-slot:amount="{ row }">
      <q-slider
        v-if="row.expanded"
        v-model="row.amount"
        color="primary"
        snap
        :min="0.5"
        :step="0.5"
        :max="3"
      />
      <span v-else></span>
    </template>
  </custom-table>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import Autocomplete from '@/components/misc/autocompleteSearch.vue'
import CustomTable from '@/components/misc/CustomTable.vue'

import ItemService from '@/services/ItemService'
import TypeOfMealService from '@/services/TypeOfMealService'

import type Food from '@/types/Food'
import type TypeOfMeal from '@/types/TypeOfMeal'

export default defineComponent({
  components: {
    Autocomplete,
    CustomTable,
  },
  emits: ['update:modelValue'],
  props: ['modelValue'],
  data() {
    return {
      search: null as string | null,
      item_id: undefined as string | undefined,
      typeSelected: null as TypeOfMeal | null,
      typeOfMeals: [] as TypeOfMeal[],
      items: [] as any[],
      date: null,
      columns: [
        {
          name: 'description',
          label: 'Descrição',
          field: (row: any) => row.description,
          align: 'left',
          sortable: false,
        },
        {
          name: 'amount',
          label: 'Quantidade',
          align: 'right',
          sortable: false,
          size: '15%',
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
  async mounted() {
    this.typeOfMeals = (
      await TypeOfMealService.index(1, 10, 'description:DESC')
    ).data.data
  },
  computed: {
    mealOfPlan: {
      get() {
        return this.modelValue
      },
      set(val: any) {
        return this.$emit('update:modelValue', val)
      },
    },
  },
  methods: {
    calculateAmount(row: any) {
      const item = this.items.find((item) => item.id === row.parent_id)
      return (item?.amount || 0) * row.amount_grams
    },
    calculateGrams(row: any, key: string) {
      return Math.round((row.food[key] * this.calculateAmount(row)) / 100)
    },
    async addItem(id: string) {
      const item = (await ItemService.show(id)).data
      this.items = [...this.items, { ...item, amount: 1 }]
      this.item_id = undefined
      this.mealOfPlan = { ...this.mealOfPlan, mealsOptions: this.items }
    },
    view(id: string): void {
      alert('Mostrar dados do alimento')
    },
    remove(id: string): void {
      this.items = this.items.filter((o) => o.id === id)
      this.mealOfPlan = { ...this.mealOfPlan, mealsOptions: this.items }
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
