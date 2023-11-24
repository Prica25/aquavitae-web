<template>
  <base-page title="Antecedentes">
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
          <autocomplete
            v-model="object.food"
            type="Food"
            value-key="id"
            label-key="description"
            label="Alimento"
            :rules="[
                  (val: string) => !!val || 'Preenchimento Obrigatório',
                ]"
          />

          <autocomplete
            v-model="object.specificity_type"
            type="SpecificityType"
            value-key="id"
            label-key="description"
            label="Tipo"
            :rules="[
                  (val: string) => !!val || 'Preenchimento Obrigatório',
                ]"
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

import SpecificityService from '@/services/SpecificityService.ts'

export default defineComponent({
  components: {
    Autocomplete,
  },
  props: {
    user_id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formChanged: false,
      object: {
        food: '',
        specificity_type: '',
        user: this.user_id,
      },
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
          await SpecificityService.post(this.object)
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
