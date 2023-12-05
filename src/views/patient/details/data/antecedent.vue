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
    update-form="antecedent-update-form"
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
          name: 'description',
          label: 'Descrição',
          field: 'description',
          size: '40%',
        },
        {
          name: 'antecedent_type',
          label: 'Tipo de Antecedente',
          field: (row: any) => row.antecedent_type.description,
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
        label: 'Antecedentes',
        href: 'antecedent',
        params: { user_id: this.user_id },
      }
    )
  },
})
</script>
