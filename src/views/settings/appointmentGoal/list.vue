<template>
  <List
    title="Objetivos"
    type="AppointmentGoal"
    add-button
    add-button-text="Adicionar Objetivo"
    table-sort-by="description"
    filter-column="description"
    :columns="columns"
    create-form="appointment-goals-create-form"
    update-form="appointment-goals-update-form"
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
