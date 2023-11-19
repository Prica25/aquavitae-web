<template>
  <List
    title="Antecedentes"
    type="Antecedent"
    add-button
    add-button-text="Adicionar Antecendente"
    table-sort-by="description"
    filter-column="description"
    :columns="columns"
    create-form="antecedent-create-form"
    :default-filter="`user:${user_id}`"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import List from '@/components/misc/List.vue'

export default defineComponent({
  props: {
    user_id: {
      type: String,
      required: true,
    },
  },
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
          size: '80%',
        },
      ],
    }
  },
})
</script>
