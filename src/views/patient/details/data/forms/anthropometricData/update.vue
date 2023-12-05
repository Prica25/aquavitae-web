<template>
  <base-page title="Dados Antropométricos">
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
            v-model="object.weight"
            label="Peso"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.height"
            label="Altura"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.waist_circumference"
            label="Circunferência da Cintura"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.fat_mass"
            label="Massa de Gordura"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.muscle_mass"
            label="Massa Muscular"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.bone_mass"
            label="Massa Óssea"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.body_water"
            label="Água Corporal"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.basal_metabolism"
            label="Metabolismo Basal"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.visceral_fat"
            label="Gordura Visceral"
            width="200px"
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

import AnthropometricDataService from '@/services/AnthropometricDataService'

export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formChanged: false,
      object: {
        weight: '',
        height: '',
        waist_circumference: '',
        fat_mass: '',
        muscle_mass: '',
        bone_mass: '',
        body_water: '',
        basal_metabolism: '',
        visceral_fat: '',
      },
    }
  },
  async created() {
    const object = (await AnthropometricDataService.show(this.id)).data
    for (const key in this.object) {
      this.object[key] = object[key]
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
          await AnthropometricDataService.put(this.id, this.object)
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
