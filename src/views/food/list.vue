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
    :db-columns="dbColumns"
  >
  </List>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import List from '@/components/misc/List.vue'

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
          label: 'Energia (kcal)',
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
    }
  },
})
</script>
