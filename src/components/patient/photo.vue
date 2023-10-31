<template>
  <q-avatar :size="`${size}px`" color="primary" style="color: white !important">
    <img :src="photoBase64" />
  </q-avatar>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    photo: {
      type: [String, Boolean],
      default: false,
    },
    size: {
      type: Number,
      default: 32,
    },
  },
  computed: {
    photoBase64() {
      if (false && this.photo) {
        return `data:image/jpeg;base64,${this.photo}`
      }
      const url = new URL('/src/assets/default_user.svg', import.meta.url)
      return url.toString()
    },
  },
})
</script>
