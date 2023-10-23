<template>
  <base-page title="Objetivos">
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
            width="200px"
            :rules="[(val) => (val && val.length > 0) || 'Campo Obrigatório']"
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
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

import AppointmentGoalService from '@/services/AppointmentGoalService'
import type AppointmentGoal from '@/types/AppointmentGoal'

export default defineComponent({
  data() {
    return {
      formChanged: false,
      object: {
        description: '',
      } as AppointmentGoal,
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
          await AppointmentGoalService.post(this.object)
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
