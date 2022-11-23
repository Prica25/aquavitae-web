<template>
  <q-select
    filled
    v-model="model"
    multiple
    :options="options"
    :loading="loading"
    @virtual-scroll="onScroll"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {}
  },
})
</script>
