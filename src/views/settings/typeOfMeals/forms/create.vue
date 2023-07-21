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
      <q-form
        ref="form"
        @submit="save"
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
            :rules="[(val) => (val && val.length > 0) || 'Campo Obrigatório']"
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            @change="formChanged = true"
          />
          <micronutrients-percentage-bar
            v-model="micronutrients"
            @change="formChanged = true"
          />
          <q-btn color="primary" label="Adicionar" type="submit" />
        </q-card>
      </q-form>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import micronutrientsPercentageBar from '@/components/micronutrientsPercentageBar/index.vue'

import TypeOfMealService from '@/services/TypeOfMealService'

export default defineComponent({
  components: { micronutrientsPercentageBar },
  data() {
    return {
      formChanged: false,
      text: '',
      micronutrients: [
        { name: 'Lípidos', percentage: 30 },
        { name: 'Proteínas', percentage: 15 },
        { name: 'Hidratos de Carbono', percentage: 55 },
      ],
    }
  },
  methods: {
    async goBack() {
      if (!this.formChanged || (await this.$confirmation('cancel'))) {
        this.$router.back()
      }
    },
    async save() {
      if (await this.$confirmation('save')) {
        try {
          let obj = {
            description: this.text,
            lipids_percentage: this.micronutrients[0].percentage,
            proteins_percentage: this.micronutrients[1].percentage,
            carbohydrates_percentage: this.micronutrients[2].percentage,
          }
          await TypeOfMealService.post(obj)
        } catch (err) {
          console.log(err)
        }
      }
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
