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
            v-model="object.total_proteins"
            label="Proteínas totais"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.albumin"
            label="Albumina"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.urea"
            label="Ureia"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.uric_acid"
            label="Ácido Úrico"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.creatinine"
            label="Creatinina"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.total_cholesterol"
            label="Colesterol Total"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.hdl"
            label="HDL"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.ldl"
            label="LDL"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.glycemia"
            label="Glicemia"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.hda1c"
            label="HgA1C"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.fasting_glycemia"
            label="Glicemia jj"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.post_prandial_glycemia"
            label="Glicemia pp"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.total_bilirubin"
            label="Bilirrubina total"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.biliburin_direct"
            label="Bilirrubina directa"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.alkaline_phosphatase"
            label="Fosfatase alcalina"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.ast_tgo"
            label="AST/TGO"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.alt_tgp"
            label="ALT/TGP"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.ygt"
            label="γ-GT-"
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

import BiochemicalDataService from '@/services/BiochemicalDataService'

export default defineComponent({
  props: {
    appointment_id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      formChanged: false,
      object: {
        total_proteins: '',
        albumin: '',
        urea: '',
        uric_acid: '',
        creatinine: '',
        total_cholesterol: '',
        hdl: '',
        ldl: '',
        glycemia: '',
        hda1c: '',
        fasting_glycemia: '',
        post_prandial_glycemia: '',
        total_bilirubin: '',
        biliburin_direct: '',
        alkaline_phosphatase: '',
        ast_tgo: '',
        alt_tgp: '',
        ygt: '',
        appointment: this.appointment_id,
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
          await BiochemicalDataService.post(this.object)
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
