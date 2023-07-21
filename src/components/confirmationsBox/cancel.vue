<template>
  <confirmation-base
    title="Cancelar"
    description="Têm certeza que deseja sair e perder as alterações?"
    icon="times"
    iconColor="negative"
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
