<template>
  <confirmation-base
    title="Completar Plano Nutricional"
    description="Têm certeza que deseja completar o plano nutricional?"
    icon="edit"
    :buttons="buttons"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import confirmationBase from './Base.vue'

export default defineComponent({
  components: {
    confirmationBase,
  },
  data() {
    return {
      buttons: [
        { text: 'Não', result: false, color: 'negative' },
        { text: 'Sim', result: true, color: 'primary' },
      ],
    }
  },
})
</script>
