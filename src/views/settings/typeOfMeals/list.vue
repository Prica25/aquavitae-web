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
  >
  </List>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import List from '@/components/List.vue'

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
          align: 'left',
          style:
            'min-width: 10vw; max-width: 10vw; text-overflow: ellipsis; overflow: hidden;',
          headerStyle: 'min-width: 10vw; max-width: 10vw',
          sortable: true,
        },
        {
          name: 'lipids_percentage',
          label: 'Lípidos (%)',
          field: 'lipids_percentage',
          align: 'center',
          style: 'font-weight: bold;',
          sortable: true,
        },
        {
          name: 'proteins_percentage',
          label: 'Proteína (%)',
          field: 'proteins_percentage',
          align: 'center',
          style: 'font-weight: bold;',
          sortable: true,
        },
        {
          name: 'carbohydrates_percentage',
          label: 'Hidratos Carbono (%)',
          field: 'carbohydrates_percentage',
          align: 'center',
          style: 'font-weight: bold;',
          sortable: true,
        },
        {
          name: 'actions',
          align: 'center',
          label: 'Ações',
          field: 'actions',
          sortable: false,
        },
      ],
    }
  },
})
</script>
