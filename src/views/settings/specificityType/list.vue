<template>
  <List
    title="Tipo de Especificidades"
    type="SpecificityType"
    add-button
    add-button-text="Adicionar Tipo"
    table-sort-by="description"
    filter-column="description"
    :columns="columns"
    create-form="specificity-type-create-form"
    update-form="specificity-type-update-form"
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
      columns: [
        {
          name: 'description',
          label: 'Descrição',
          field: 'description',
        },
      ],
    }
  },
})
</script>
