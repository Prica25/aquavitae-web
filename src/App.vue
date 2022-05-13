<template>
  <component :is="'Default'" />
</template>

<script lang="ts">
import Default from '@/layouts/default/index.vue'
import { defineComponent } from 'vue'

export default defineComponent({
  components: {
    Default,
  },
})
</script>

<style>
#app {
  width: 100vw;
  height: 100vh;
  margin: 0 auto;
  font-weight: normal;
}
</style>
