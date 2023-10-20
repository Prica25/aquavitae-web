<template>
  <base-page title="Tipo de Refeição">
    <template #right-header>
      <q-btn
        outline
        round
        color="negative"
        icon="fa-solid fa-xmark"
        @click="goBack"
      />
    </template>
    <template #content>
      <q-form
        ref="form"
        @submit="save"
        class="items-center justify-center"
        style="display: flex; width: 100%; height: 100%; flex-direction: column"
      >
        <div class="box-default q-pa-xl text-center form-card">
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
          <macronutrients-percentage-bar
            v-model="calories"
            @change="formChanged = true"
          />
          <div style="margin: 12px">Macronutrientes</div>
          <macronutrients-percentage-bar
            v-for="(macronutrient, i) in macronutrients"
            v-model="macronutrients[i]"
            @change="formChanged = true"
          />
          <q-btn color="primary" label="Adicionar" type="submit" />
        </div>
      </q-form>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import macronutrientsPercentageBar from '@/components/macronutrientsPercentageBar/index.vue'

import TypeOfMealService from '@/services/TypeOfMealService'

export default defineComponent({
  components: { macronutrientsPercentageBar },
  data() {
    return {
      formChanged: false,
      text: '',
      calories: {
        name: 'Calorias',
        key: 'calories_percentage',
        percentage: 20,
      },
      macronutrients: [
        { name: 'Lípidos', key: 'lipids_percentage', percentage: 30 },
        { name: 'Proteínas', key: 'proteins_percentage', percentage: 15 },
        {
          name: 'Hidratos de Carbono',
          key: 'carbohydrates_percentage',
          percentage: 55,
        },
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
            ...[...this.macronutrients, this.calories].reduce(
              (pv: any, cv: any) => {
                pv[cv.key] = cv.percentage
                return pv
              },
              {}
            ),
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
