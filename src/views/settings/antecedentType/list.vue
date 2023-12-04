<template>
  <List
    title="Tipo de Antecedentes"
    type="AntecedentType"
    add-button
    add-button-text="Adicionar Tipo"
    table-sort-by="description"
    filter-column="description"
    :columns="columns"
    create-form="antecedent-type-create-form"
    update-form="antecedent-type-update-form"
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
