<template>
  <q-card class="q-pa-md meal-card box-default" style="width: 100%">
    <div class="row meal">
      <q-input
        outlined
        dense
        label="Descrição"
        v-model="modelValue.description"
        style="width: 200px"
      ></q-input>
      <q-separator vertical style="margin: 0 8px" />
      <autocomplete
        v-model="typeSelected"
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
        v-model="modelValue.start_time"
        mask="##:##"
        style="width: 60px; margin-left: 8px"
      >
        <q-popup-proxy
          transition-show="scale"
          transition-hide="scale"
          :offset="[91, 12]"
        >
          <q-time
            v-model="modelValue.start_time"
            mask="HH:mm"
            minimal
            format24h
          />
        </q-popup-proxy>
      </q-input>
      <q-input
        outlined
        dense
        v-model="modelValue.end_time"
        mask="##:##"
        style="width: 60px; margin-left: 8px"
      >
        <q-popup-proxy
          transition-show="scale"
          transition-hide="scale"
          :offset="[91, 12]"
        >
          <q-time
            v-model="modelValue.end_time"
            mask="HH:mm"
            minimal
            format24h
          />
        </q-popup-proxy>
      </q-input>
      <q-space />
      <autocomplete
        v-model="item_id"
        @update:model-value="addFood"
        type="Item"
        value-key="id"
        label-key="description"
        label="Procurar Receita..."
        style="width: 200px"
      />
    </div>

    <q-table
      ref="table"
      table-header-class="header-table"
      :rows="foodList"
      :columns="columns"
      no-data-label="Sem alimentos selecionados"
      hide-pagination
    ></q-table>
  </q-card>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import Autocomplete from '@/components/misc/autocompleteSearch.vue'

import ItemService from '@/services/ItemService'
import TypeOfMealService from '@/services/TypeOfMealService'

import type Item from '@/types/Item'
import type Food from '@/types/Food'
import type TypeOfMeal from '@/types/TypeOfMeal'

export default defineComponent({
  components: {
    Autocomplete,
  },
  emits: ['update:modelValue'],
  props: ['modelValue'],
  data() {
    return {
      search: null as string | null,
      item_id: null as string | null,
      typeSelected: null as TypeOfMeal | null,
      typeOfMeals: [] as TypeOfMeal[],
      foodList: [] as Food[],
      date: null,
      columns: [
        {
          name: 'description',
          label: 'Descrição',
          field: (row: any) => row.food.description,
          align: 'left',
          style:
            'min-width: 10vw; max-width: 10vw; text-overflow: ellipsis; overflow: hidden;',
          headerStyle: 'min-width: 10vw; max-width: 10vw',
          sortable: true,
        },
        {
          name: 'amount',
          label: 'Quantidade (g)',
          field: 'amount_grams',
          align: 'center',
          style: 'font-weight: bold;',
          sortable: true,
        },
        {
          name: 'proteins',
          label: 'Proteína (g)',
          field: (row: any) => this.calculateGrams(row, 'proteins'),
          align: 'center',
          style: 'font-weight: bold;',
          sortable: true,
        },
        {
          name: 'lipids',
          label: 'Lípidos (g)',
          field: (row: any) => this.calculateGrams(row, 'lipids'),
          align: 'center',
          style: 'font-weight: bold;',
          sortable: true,
        },
        {
          name: 'carbohydrates',
          label: 'Hidratos de Carbono (g)',
          field: (row: any) => this.calculateGrams(row, 'carbohydrates'),
          align: 'center',
          style: 'font-weight: bold;',
          sortable: true,
        },
        {
          name: 'energy_value',
          label: 'Energia (kcal)',
          field: (row: any) => this.calculateGrams(row, 'energy_value'),
          align: 'center',
          style: 'font-weight: bold;',
          sortable: true,
        },
        // {
        //   name: 'actions',
        //   align: 'center',
        //   label: 'Ações',
        //   field: 'actions',
        //   sortable: false,
        // },
      ],
    }
  },
  async mounted() {
    this.typeOfMeals = (
      await TypeOfMealService.index(1, 10, 'description:DESC')
    ).data.data
  },
  methods: {
    calculateGrams(row: any, key: string) {
      return Math.round((row.food[key] * row.amount_grams) / 100)
    },
    async addFood(id: string): Promise<void> {
      const item = (await ItemService.show(id)).data as Item
      this.foodList = [...this.foodList, ...item.foods]
      console.log(this.foodList)
      this.item_id = null
    },
    view(id: string): void {
      alert('Mostrar dados do alimento')
    },
    remove(id: string): void {
      this.foodList = this.foodList.filter((o) => o.id === id)
    },
  },
  watch: {
    foodList: {
      handler() {
        this.$emit('update-meal', this.foodList)
      },
      deep: true,
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
  margin: 20px 0;
}
.meal {
  align-items: center;
  margin-bottom: 20px;
}
.meal > span {
  color: #646464;
  font-weight: bold;
}
</style>
