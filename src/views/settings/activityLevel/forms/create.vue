<template>
  <base-page title="Tipo de Refeição">
    <template v-slot:right-header>
      <q-btn
        outline
        round
        color="negative"
        icon="fa-solid fa-xmark"
        @click="goBack"
      />
    </template>
    <template v-slot:content>
      <div
        class="items-center justify-center"
        style="display: flex; width: 100%; height: 100%; flex-direction: column"
      >
        <q-card class="q-pa-xl text-center form-card">
          <q-input
            outlined
            dense
            v-model="text"
            label="Descrição"
            width="200px"
          />
          <micronutrients-percentage-bar v-model="micronutrients" />
          <q-btn color="primary" label="Adicionar" />
        </q-card>
      </div>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import micronutrientsPercentageBar from '@/components/micronutrientsPercentageBar/index.vue'

export default defineComponent({
  components: { micronutrientsPercentageBar },
  data() {
    return {
      text: 'Pequeno-Almoço',
      micronutrients: [
        { name: 'Lípidos', percentage: 30 },
        { name: 'Proteínas', percentage: 15 },
        { name: 'Hidratos de Carbono', percentage: 55 },
      ],
    }
  },
  methods: {
    goBack() {
      this.$router.back()
    },
  },
})
</script>
<style scoped>
.form-card {
  width: 35vw;
  min-width: 500px;
}
.form-card > * {
  margin: 10px 10px 0 10px;
}
.form-card > .q-btn {
  margin-top: 25px;
}
</style>
