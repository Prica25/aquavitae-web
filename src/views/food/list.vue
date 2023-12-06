<template>
  <List
    title="Alimentos"
    type="Food"
    add-button
    add-button-text="Adicionar Alimento"
    table-sort-by="description"
    filter-column="description"
    :columns="columns"
    create-form="food-create-form"
    update-form="food-update-form"
    :db-columns="dbColumns"
  >
    <template #custom-actions="{ row }">
      <q-icon
        name="fa-solid fa-eye"
        color="primary"
        style="cursor: pointer; margin: 0 4px"
        @click="details(row.id)"
      />
    </template>
  </List>
  <q-dialog v-model="foodDetails">
    <q-card style="width: 50vw; max-width: 50vw; background: #f5f5f5">
      <div style="padding: 12px">
        <div
          v-for="param in foodParams"
          :class="{ row: true, 'box-default': !param.spacer }"
          :style="
            param.spacer ? 'margin: 14px 0;' : 'margin: 8px 0; padding: 12px'
          "
        >
          <div v-if="!param.spacer" class="col text-center">
            <b>{{ param.label }}</b>
          </div>
          <q-separator v-if="!param.spacer" vertical />
          <div
            v-if="!param.spacer && param.formatter"
            class="col text-center"
            v-html="param.formatter(food[param.value])"
          />
          <div v-if="!param.spacer && !param.formatter" class="col text-center">
            {{ food ? getValue(food, param.value) || '...' : '...' }}
            <i>{{ param.unit ? param.unit : '' }}</i>
          </div>
        </div>
      </div>

      <q-card-actions align="center" style="padding: 12px">
        <q-btn label="Fechar" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import List from '@/components/misc/List.vue'

import FoodService from '@/services/FoodService'

export default defineComponent({
  components: {
    List,
  },
  data() {
    return {
      dbColumns: ['description', 'energy_value', 'food_category'],
      columns: [
        {
          name: 'description',
          label: 'Descrição',
          field: 'description',
          size: '15%',
        },
        {
          name: 'energy_value',
          label: 'Valor Energético (kcal)',
          field: 'energy_value',
          align: 'center',
          style: 'font-weight: bold;',
        },
        {
          name: 'level_1',
          label: 'Nível 1',
          field: (row: any) => row.food_category.parent?.parent?.description,
          size: '20%',
          sortable: false,
        },
        {
          name: 'level_2',
          label: 'Nível 2',
          field: (row: any) => row.food_category.parent?.description || '---',
          size: '20%',
          sortable: false,
        },
        {
          name: 'level_3',
          label: 'Nível 3',
          field: (row: any) => row.food_category.description || '---',
          size: '20%',
          sortable: false,
        },
      ],
      foodDetails: false,
      foodParams: [
        { label: 'Descrição', value: 'description' },
        { label: 'Nível 1', value: 'food_category.parent.parent.description' },
        { label: 'Nível 2', value: 'food_category.parent.description' },
        { label: 'Nível 3', value: 'food_category.description' },
        { label: 'Valor Energético', value: 'energy_value', unit: 'kcal' },
        { label: 'Proteínas', value: 'proteins', unit: 'g' },
        { label: 'Lípidos', value: 'lipids', unit: 'g' },
        { label: 'Hidratos de Carbono', value: 'carbohydrates', unit: 'g' },
        { label: 'Sódio', value: 'sodium', unit: 'mg' },
        { label: 'Potássio', value: 'potassium', unit: 'mg' },
        { label: 'Fósforo', value: 'phosphorus', unit: 'mg' },
      ],
      food: null,
    }
  },
  methods: {
    getValue(data: any, key: string): string | null {
      if (key.includes('.')) {
        const keys = key.split('.')
        return this.getValue(data[keys[0]], keys.slice(1).join('.'))
      }
      return data?.[key]
    },
    async details(id: string) {
      this.food = (await FoodService.show(id)).data
      console.log(this.food)
      this.foodDetails = true
    },
  },
})
</script>
