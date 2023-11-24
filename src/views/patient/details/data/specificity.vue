<template>
  <List
    title="Especificidades"
    type="Specificity"
    add-button
    add-button-text="Adicionar Especificidade"
    table-sort-by="user_id"
    filter-column="user_id"
    :columns="columns"
    create-form="specificity-create-form"
    :default-filter="`user_id:${user_id}`"
    :breadcrumbs="breadcrumbs"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import List from '@/components/misc/List.vue'
import PersonalDataService from '@/services/PersonalDataService'
import type PersonalData from '@/types/PersonalData'

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
      breadcrumbs: [] as any[],
      columns: [
        {
          name: 'food',
          label: 'Alimento',
          field: (row: any) => row.food.description,
          size: '40%',
          sortable: false,
        },
        {
          name: 'specificity_type',
          label: 'Tipo',
          field: (row: any) => row.specificity_type.description,
          size: '40%',
          sortable: false,
        },
      ],
    }
  },
  async created() {
    let personalData = (await PersonalDataService.show(this.user_id))
      .data[0] as PersonalData
    this.breadcrumbs.push(
      { label: 'Pacientes', icon: 'users', href: 'patient' },
      {
        label: `${personalData.first_name} ${personalData.last_name}`,
        href: 'menu-user',
        params: { user_id: this.user_id },
      },
      {
        label: 'Especificidades',
        href: 'specificity',
        params: { user_id: this.user_id },
      }
    )
  },
})
</script>
