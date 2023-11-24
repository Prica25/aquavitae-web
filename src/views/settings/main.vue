<template>
  <base-page
    title="Gestão"
    horizontal-alignment="center"
    vertical-alignment="center"
    no-header
  >
    <template #content>
      <div class="row justify-center">
        <Option
          v-for="(option, index) in options"
          :key="`settings-option-${index}`"
          :description="option.description"
          :icon="option.icon"
          :href="option.href"
        ></Option>
      </div>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import Option from '@/components/settings/option.vue'

export default defineComponent({
  components: {
    Option,
  },
  data() {
    return {
      options: [
        { description: 'Utilizadores', icon: 'user', href: 'user' },
        {
          description: 'Tipos de Refeições',
          icon: 'utensils',
          href: 'type-meals',
        },
        {
          description: 'Nível de Atividade',
          icon: 'running',
          href: 'activity-level',
        },
        {
          description: 'Tipo de Antecedentes',
          icon: 'laptop-medical',
          href: 'antecedent-type',
        },
        {
          description: 'Objetivos',
          icon: 'bullseye',
          href: 'appointment-goal',
        },
        {
          description: 'Tipo de Especificidades',
          icon: 'burst',
          href: 'specificity-type',
        },
      ],
    }
  },
})
</script>
<style scoped>
.content-slot {
  align-items: center;
  justify-content: center;
}
</style>
