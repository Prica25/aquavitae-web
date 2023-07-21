<template>
  <confirmation-base
    title="Remover"
    description="Têm certeza que deseja remover este registo?"
    icon="trash"
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
