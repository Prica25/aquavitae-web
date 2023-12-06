<template>
  <q-avatar :size="`${size}px`" color="primary" style="color: white !important">
    <img :src="photoBase64" />
  </q-avatar>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import defaultUserImage from '/src/assets/default_user.svg'

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
      return this.photo || defaultUserImage.toString()
    },
  },
})
</script>
