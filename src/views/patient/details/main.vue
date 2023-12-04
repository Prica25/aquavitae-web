<template>
  <base-page
    title="Configurações"
    horizontal-alignment="center"
    vertical-alignment="center"
    no-header
    :breadcrumbs="breadcrumbs"
  >
    <template #content>
      <div class="row justify-center">
        <Option
          v-for="(option, index) in options"
          :key="`settings-option-${index}`"
          :description="option.description"
          :icon="option.icon"
          :href="option.href"
          :params="option.params"
        ></Option>
      </div>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import Option from '@/components/settings/option.vue'

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
    Option,
  },
  data() {
    return {
      breadcrumbs: [] as any[],
      options: [
        {
          description: 'Dados do Paciente',
          icon: 'id-card',
          href: 'personal-data',
          params: { user_id: this.user_id },
        },
        {
          description: 'Plano Nutricional',
          icon: 'receipt',
          href: 'nutritional-plan',
          params: { user_id: this.user_id },
        },
        {
          description: 'Diário',
          icon: 'calendar-day',
          href: 'diary',
          params: { user_id: this.user_id },
        },
        {
          description: 'Dados Antropométricos',
          icon: 'weight-scale',
          href: 'anthropometric-data',
          params: { user_id: this.user_id },
        },
        {
          description: 'Antecedentes',
          icon: 'file-medical',
          href: 'antecedent',
          params: { user_id: this.user_id },
        },
        {
          description: 'Especificidades',
          icon: 'person-burst',
          href: 'specificity',
          params: { user_id: this.user_id },
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
      }
    )
  },
})
</script>
<style scoped>
.content-slot {
  align-items: center;
  justify-content: center;
}
</style>
