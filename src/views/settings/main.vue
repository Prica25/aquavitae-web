<template>
  <base-page
    title="Configurações"
    horizontal-alignment="center"
    vertical-alignment="center"
    no-header
  >
    <template v-slot:content>
      <Option
        v-for="(option, index) in options"
        :key="`settings-option-${index}`"
        :description="option.description"
        :icon="option.icon"
        :href="option.href"
      ></Option>
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
        {
          description: 'Plano Nutricional',
          icon: 'apple-whole',
          href: 'nutrition-plan',
          params: {},
        },
        { description: 'Refeições', icon: 'utensils', href: 'meal' },
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
