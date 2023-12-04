<template>
  <List
    title="Nível de Atividade"
    type="ActivityLevel"
    add-button
    add-button-text="Adicionar Nível"
    table-sort-by="factor"
    filter-column="description"
    :columns="columns"
    create-form="activity-level-create-form"
    update-form="activity-level-update-form"
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
        {
          name: 'factor',
          label: 'Fator',
          field: 'factor',
          align: 'center',
        },
      ],
    }
  },
})
</script>
