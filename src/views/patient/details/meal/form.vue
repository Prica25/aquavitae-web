<template>
  <base-page title="Refeições"> </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  props: {
    user_id: {
      type: String,
      required: true,
    },
  },
})
</script>
