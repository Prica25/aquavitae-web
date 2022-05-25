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

/* width */
::-webkit-scrollbar {
  width: 14px;
  margin: 2px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: var(--q-primary);
  border-radius: 10px;
  border: 4px #f5f5f5 solid;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: var(--q-primary);
}
</style>
