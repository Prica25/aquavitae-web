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
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import TypeOfMealService from '@/services/TypeOfMealService.js'

import List from '@/components/misc/List.vue'

export default defineComponent({
  components: {
    List,
  },
  data() {
    return {
      dbColumns: ['description', 'foods', 'can_eat_at'],
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
        field: (row: any) =>
          row.can_eat_at.findIndex((cea) => cea.type_of_meal === type.id) !== -1
            ? '<i class="fa-solid fa-circle-check" style="color: var(--q-primary)"></i>'
            : '<i class="fa-regular fa-circle"></i>',
        align: 'center',
      })
    }
    this.columns.push({
      name: 'foods',
      label: 'Alimentos',
      field: (row: any) => 'asd',
      align: 'center',
    })
  },
})
</script>
