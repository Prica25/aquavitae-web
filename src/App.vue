<template>
  <component :is="$route.meta.layout ? $route.meta.layout : 'Default'" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import Default from '@/layouts/default/index.vue'
import Clean from '@/layouts/clean/index.vue'

import { useUserStore } from '@/stores/user'

export default defineComponent({
  components: {
    Default,
    Clean,
  },
  data() {
    return {
      store: useUserStore(),
    }
  },
  created() {
    if (!this.store.getToken) this.$router.push('/login')
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
