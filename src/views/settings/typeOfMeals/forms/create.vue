<template>
  <base-page title="Novo Tipo de Refeição">
    <template v-slot:content>
      <div
        class="items-center justify-center"
        style="display: flex; width: 100%; height: 100%; flex-direction: column"
      >
        <q-card class="q-pa-sm">
          <q-input outlined v-model="text" label="Outlined" width="200px" />
        </q-card>
      </div>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  data() {
    return {
      text: '',
    }
  },
})
</script>
