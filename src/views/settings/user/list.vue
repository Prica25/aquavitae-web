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
    :db-columns="dbColumns"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import { formatDate } from '@/utils'

import List from '@/components/misc/List.vue'

export default defineComponent({
  components: {
    List,
  },
  data() {
    return {
      dbColumns: ['last_access'],
      columns: [
        {
          name: 'email',
          label: 'Email',
          field: 'email',
          size: '50%',
        },
        {
          name: 'role',
          label: 'Perfil',
          field: 'role',
          align: 'center',
        },
        {
          name: 'last_access',
          label: 'Último Acesso',
          field: (row: any) => formatDate(row.last_access),
          align: 'center',
        },
      ],
    }
  },
  methods: {},
})
</script>
