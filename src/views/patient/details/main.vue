<template>
  <base-page
    title="Configurações"
    horizontal-alignment="center"
    vertical-alignment="center"
    no-header
  >
    <template #content>
      <Option
        v-for="(option, index) in options"
        :key="`settings-option-${index}`"
        :description="option.description"
        :icon="option.icon"
        :href="option.href"
        :params="option.params"
      ></Option>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import Option from '@/components/settings/option.vue'

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
      options: [
        {
          description: 'Dados Pessoais',
          icon: 'weight-scale',
          href: 'personal-data',
          params: { user_id: this.user_id },
        },
        {
          description: 'Plano Nutricional',
          icon: 'apple-whole',
          href: 'nutrition-plan',
        },
        { description: 'Diário', icon: 'calendar-day', href: 'appointment' },
        {
          description: 'Dados Antropométricos',
          icon: 'weight-scale',
          href: 'anthropometric-data',
        },
        { description: 'Patologias', icon: 'disease', href: 'appointment' },
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
