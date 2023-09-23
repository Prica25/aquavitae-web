<template>
  <q-avatar :size="`${size}px`" color="primary" style="color: white !important">
    <img v-if="photo" :src="photoBase64" />
    <q-icon v-else name="fa-solid fa-user" :size="`${size * 0.6}px`" />
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
      return `data:image/png;base64,${this.photo}`
    },
  },
})
</script>
