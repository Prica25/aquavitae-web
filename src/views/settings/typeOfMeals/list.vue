<template>
  <List
    title="Tipos de Refeições"
    type="TypeOfMeal"
    add-button
    add-button-text="Adicionar Tipo"
    table-sort-by="description"
    filter-column="description"
    :columns="columns"
    create-form="type-meals-create-form"
    update-form="type-meals-update-form"
  />
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
      columns: [
        {
          name: 'description',
          label: 'Descrição',
          field: 'description',
          size: '40%',
        },
        {
          name: 'lipids_percentage',
          label: 'Lípidos (%)',
          field: 'lipids_percentage',
          align: 'center',
          style: 'font-weight: bold;',
        },
        {
          name: 'proteins_percentage',
          label: 'Proteína (%)',
          field: 'proteins_percentage',
          align: 'center',
          style: 'font-weight: bold;',
        },
        {
          name: 'carbohydrates_percentage',
          label: 'Hidratos Carbono (%)',
          field: 'carbohydrates_percentage',
          align: 'center',
          style: 'font-weight: bold;',
        },
      ],
    }
  },
})
</script>
