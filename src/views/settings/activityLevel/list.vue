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
          align: 'left',
          style:
            'min-width: 10vw; max-width: 10vw; text-overflow: ellipsis; overflow: hidden;',
          headerStyle: 'min-width: 10vw; max-width: 10vw',
          sortable: true,
        },
        {
          name: 'factor',
          label: 'Fator',
          field: 'factor',
          align: 'center',
          sortable: true,
        },
      ],
    }
  },
})
</script>
