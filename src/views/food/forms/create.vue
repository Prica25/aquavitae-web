<template>
  <base-page title="Alimentos" :breadcrumbs="breadcrumbs">
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
            v-model="object.description"
            label="Descrição"
            :rules="[(val) => (val && val.length > 0) || 'Campo Obrigatório']"
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            @change="formChanged = true"
          />
          <autocomplete
            v-model="object.food_category"
            @update:model-value="formChanged = true"
            label="Categoria do Alimento"
            type="FoodCategory"
            value-key="id"
            label-key="description"
            default-filter="level:3"
          />
          <q-input
            outlined
            dense
            v-model="object.proteins"
            label="Proteínas"
            @change="int('proteins')"
          />
          <q-input
            outlined
            dense
            v-model="object.lipids"
            label="Lípidos"
            @change="int('lipids')"
          />
          <q-input
            outlined
            dense
            v-model="object.carbohydrates"
            label="Hidratos de Carbono"
            @change="int('carbohydrates')"
          />
          <q-input
            outlined
            dense
            v-model="object.energy_value"
            label="Valor Energético"
            @change="int('energy_value')"
          />
          <q-input
            outlined
            dense
            v-model="object.potassium"
            label="Potássio"
            @change="int('potassium')"
          />
          <q-input
            outlined
            dense
            v-model="object.phosphorus"
            label="Fósforo"
            @change="int('phosphorus')"
          />
          <q-input
            outlined
            dense
            v-model="object.sodium"
            label="Sódio"
            @change="int('sodium')"
          />
          <q-btn color="primary" label="Adicionar" type="submit" />
        </div>
      </q-form>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import Autocomplete from '@/components/misc/autocompleteSearch.vue'

import FoodService from '@/services/FoodService'

export default defineComponent({
  components: {
    Autocomplete,
  },
  data() {
    return {
      breadcrumbs: [] as any[],
      formChanged: false,
      object: {
        description: '',
        food_category: null,
        proteins: null,
        lipids: null,
        carbohydrates: null,
        energy_value: null,
        potassium: null,
        phosphorus: null,
        sodium: null,
      },
    }
  },
  created() {
    this.breadcrumbs.push(
      { label: 'Alimentos', icon: 'apple-whole', href: 'food' },
      {
        label: 'Novo',
        href: 'food-create-form',
      }
    )
  },
  methods: {
    int(key) {
      this.object[key] = parseInt(this.object[key])
      this.formChanged = true
    },
    async goBack() {
      if (!this.formChanged || (await this.$confirmation('cancel'))) {
        this.$router.back()
      }
    },
    async save() {
      if (await this.$confirmation('save')) {
        try {
          await FoodService.post(this.object)
          this.$router.back()
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
