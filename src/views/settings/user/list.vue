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

import UserRoleDetails from '@/types/Misc/UserRole'

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
          size: '40%',
        },
        {
          name: 'role',
          label: 'Perfil',
          field: (row: any) => this.generateChip(row.role),
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
  methods: {
    generateChip(roleKey: string) {
      const role = UserRoleDetails[roleKey]
      return `<div class="q-chip row inline no-wrap items-center bg-primary text-white q-chip--colored"><i class="q-icon text-white fa-solid fa-${role.icon}" aria-hidden="true" role="presentation" style="cursor: pointer; margin-right: 8px;" > </i><div class="q-chip__content col row no-wrap items-center q-anchor--skip"><div class="ellipsis">${role.description}</div></div></div>`
    },
  },
})
</script>
