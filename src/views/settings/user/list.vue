<template>
  <List
    title="Utilizadores"
    type="User"
    add-button
    add-button-text="Adicionar Utilizador"
    table-sort-by="email"
    filter-column="email"
    :columns="columns"
    create-form="user-create-form"
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
          name: 'email',
          label: 'Email',
          field: 'email',
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
