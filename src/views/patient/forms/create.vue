<template>
  <base-page title="Paciente" :breadcrumbs="breadcrumbs">
    <template #right-header>
      <q-stepper v-model="step" ref="stepper" color="primary" animated flat>
        <q-step
          :name="1"
          title="Dados Pessoais"
          icon="fa-solid fa-1"
          :done="step > 1"
        />
        <q-step
          :name="2"
          title="Dados Antropométricos"
          icon="fa-solid fa-2"
          :done="step > 2"
        />
        <q-step
          :name="3"
          title="Avaliação Alimentar"
          icon="fa-solid fa-3"
          :done="step > 3"
        />
        <q-step :name="4" title="Histórico Cliníco" icon="fa-solid fa-4" />
      </q-stepper>
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
        <div
          v-if="step === 1"
          class="box-default q-pa-xl text-center form-card"
        >
          <image-uploader v-model="object.user.profile_photo" :size="120" />
          <div class="row">
            <q-input
              outlined
              dense
              v-model="object.personalData.first_name"
              label="Primeiro Nome"
              :rules="[
                (val: string) => (val && val.length > 0) || 'Preenchimento Obrigatório',
              ]"
              hide-bottom-space
              autocorrect="off"
              autocapitalize="off"
              autocomplete="off"
              spellcheck="false"
              @change="formChanged = true"
              style="margin-right: 5px"
            />
            <q-input
              outlined
              dense
              v-model="object.personalData.last_name"
              label="Último Nome"
              :rules="[
              (val: string) => (val && val.length > 0) || 'Preenchimento Obrigatório',
            ]"
              hide-bottom-space
              autocorrect="off"
              autocapitalize="off"
              autocomplete="off"
              spellcheck="false"
              @change="formChanged = true"
              style="margin-left: 5px"
            />
          </div>

          <q-input
            outlined
            dense
            v-model="object.user.email"
            label="Email"
            :rules="[
              (val: string) => (val && val.length > 0) || 'Preenchimento Obrigatório',
              (val: string) => isValidEmail(val) || 'Formato incorreto',
            ]"
            hide-bottom-space
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            @change="formChanged = true"
          />
          <q-select
            dense
            outlined
            v-model="object.personalData.gender"
            :options="genders"
            option-value="value"
            option-label="description"
            label="Género"
            emit-value
            :rules="[
              (val: string) => !!val || 'Preenchimento Obrigatório',
            ]"
            hide-bottom-space
            map-options
          />
          <q-input
            outlined
            dense
            v-model="object.personalData.birthday"
            label="Data de Nascimento"
            :rules="[
              (val: string) => (val && val.length > 0) || 'Preenchimento Obrigatório',
              (val: string) => isValidDate(val) || 'Data não é válida',
            ]"
            hide-bottom-space
            @change="formChanged = true"
            mask="##/##/####"
          />
          <div class="row">
            <q-input
              outlined
              dense
              v-model="object.personalData.wake_up"
              label="Hora de Acordar"
              :rules="[
              (val: string) => (val && val.length > 0) || 'Preenchimento Obrigatório',
              (val: string) => isValidHour(val) || 'Hora não é válida',
            ]"
              hide-bottom-space
              @change="formChanged = true"
              mask="##:##"
              style="margin-right: 5px"
            />
            <q-input
              outlined
              dense
              v-model="object.personalData.bedtime"
              label="Hora de Deitar"
              :rules="[
              (val: string) => (val && val.length > 0) || 'Preenchimento Obrigatório',
              (val: string) => isValidHour(val) || 'Hora não é válida',
            ]"
              hide-bottom-space
              @change="formChanged = true"
              mask="##:##"
              style="margin-left: 5px"
            />
          </div>
          <autocomplete
            v-model="object.personalData.activity_level"
            type="ActivityLevel"
            value-key="id"
            label-key="description"
            label="Nível de Atividade"
            :rules="[
                (val: string) => !!val || 'Preenchimento Obrigatório',
              ]"
          />
          <q-input
            outlined
            dense
            v-model="object.personalData.occupation"
            label="Profissão"
            :rules="[
              (val: string) => (val && val.length > 0) || 'Preenchimento Obrigatório'
            ]"
            hide-bottom-space
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.user.password"
            label="Password"
            type="password"
            :rules="[
              (val: string) =>
                (val && val.length >= 8) ||
                'A Password têm de ter mais de 8 caracteres.',
            ]"
            hide-bottom-space
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="repeatedPassword"
            label="Confirmar password"
            type="password"
            :rules="[
              (val: string) =>
                (val && val === object.user.password) ||
                'As passwords são diferentes',
            ]"
            hide-bottom-space
            @change="formChanged = true"
          />
          <div class="row justify-center" style="margin-top: 20px !important">
            <q-btn color="primary" label="Continuar" @click="nextStep" />
          </div>
        </div>
        <div
          v-if="step === 2"
          class="box-default q-pa-xl text-center form-card"
        >
          <q-input
            outlined
            dense
            v-model="object.anthropometricData.weight"
            label="Peso"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.anthropometricData.height"
            label="Altura"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.anthropometricData.waist_circumference"
            label="Circunferência da Cintura"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.anthropometricData.fat_mass"
            label="Massa de Gordura"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.anthropometricData.muscle_mass"
            label="Massa Muscular"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.anthropometricData.bone_mass"
            label="Massa Óssea"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.anthropometricData.body_water"
            label="Água Corporal"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.anthropometricData.basal_metabolism"
            label="Metabolismo Basal"
            width="200px"
            @change="formChanged = true"
          />
          <q-input
            outlined
            dense
            v-model="object.anthropometricData.visceral_fat"
            label="Gordura Visceral"
            width="200px"
            @change="formChanged = true"
          />
          <div class="row justify-center" style="margin-top: 20px !important">
            <q-btn flat color="primary" label="Anterior" @click="prevStep" />
            <q-btn color="primary" label="Continuar" @click="nextStep" />
          </div>
        </div>
        <div
          v-if="step === 3"
          class="box-default q-pa-xl text-center form-card"
        >
          <q-input
            outlined
            dense
            v-model="object.personalData.food_history"
            label="História Alimentar"
            hide-bottom-space
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            @change="formChanged = true"
            style="margin-right: 5px"
            type="textarea"
          />
          <div
            class="row justify-center"
            style="padding: 12px 0; border-top: 1px solid rgba(0, 0, 0, 0.12)"
          >
            <span class="form-section-title"> ESPECIFICIDADES </span>
            <q-space />
            <q-btn
              flat
              color="primary"
              label="Adicionar"
              @click="addSpecificity"
            />
          </div>
          <div v-if="object.specificities.length === 0" class="row no-results">
            <q-icon
              color="negative"
              name="fa-solid fa-triangle-exclamation"
              size="24px"
              style="margin-right: 4px"
            />
            Sem Informações
          </div>
          <div class="row" v-for="specificity in object.specificities">
            <autocomplete
              v-model="specificity.food"
              type="Food"
              value-key="id"
              label-key="description"
              label="Alimento"
              style="margin-right: 5px"
              :rules="[
                (val: string) => !!val || 'Preenchimento Obrigatório',
              ]"
            />
            <autocomplete
              v-model="specificity.specificity_type"
              type="SpecificityType"
              value-key="id"
              label-key="description"
              label="Especificidade"
              style="margin-left: 5px"
              :rules="[
                (val: string) => !!val || 'Preenchimento Obrigatório',
              ]"
            />
          </div>
          <div class="row justify-center" style="margin-top: 20px !important">
            <q-btn flat color="primary" label="Anterior" @click="prevStep" />
            <q-btn color="primary" label="Continuar" @click="nextStep" />
          </div>
        </div>
        <div
          v-if="step === 4"
          class="box-default q-pa-xl text-center form-card"
        >
          <div class="row" style="padding: 12px 0">
            <span class="form-section-title"> DIAGNÓSTICO </span>
            <q-space />
            <q-checkbox
              left-label
              v-model="object.diagnosis.send_by_doctor"
              label="Enviado pelo médico"
            />
          </div>
          <q-input
            outlined
            dense
            v-model="object.diagnosis.main"
            label="Principal"
            hide-bottom-space
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            @change="formChanged = true"
            style="margin-right: 5px"
            :rules="[
              (val: string) => (val && val.length > 0) || 'Preenchimento Obrigatório',
            ]"
          />
          <q-input
            outlined
            dense
            v-model="object.diagnosis.secondary"
            label="Secondário(s)"
            hide-bottom-space
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            @change="formChanged = true"
            style="margin-right: 5px"
            type="textarea"
          />
          <q-input
            outlined
            dense
            v-model="object.diagnosis.bowel_function"
            label="Funcionamento Intestinal"
            hide-bottom-space
            autocorrect="off"
            autocapitalize="off"
            autocomplete="off"
            spellcheck="false"
            @change="formChanged = true"
            style="margin-right: 5px"
            type="textarea"
          />
          <div
            class="row justify-center"
            style="padding: 12px 0; border-top: 1px solid rgba(0, 0, 0, 0.12)"
          >
            <span class="form-section-title"> ANTECEDENTES </span>
            <q-space />
            <q-btn
              flat
              color="primary"
              label="Adicionar"
              @click="addAntecedent"
            />
          </div>
          <div v-if="object.antecedents.length === 0" class="row no-results">
            <q-icon
              color="negative"
              name="fa-solid fa-triangle-exclamation"
              size="24px"
              style="margin-right: 4px"
            />
            Sem Informações
          </div>
          <div class="row" v-for="antecedent in object.antecedents">
            <q-input
              outlined
              dense
              v-model="antecedent.description"
              label="Descrição"
              hide-bottom-space
              autocorrect="off"
              autocapitalize="off"
              autocomplete="off"
              spellcheck="false"
              @change="formChanged = true"
              style="margin-right: 5px"
              :rules="[
              (val: string) => (val && val.length > 0) || 'Preenchimento Obrigatório',
            ]"
            />
            <autocomplete
              v-model="antecedent.antecedent_type"
              type="AntecedentType"
              value-key="id"
              label-key="description"
              label="Tipo de Antecedente"
              style="margin-left: 5px"
              :rules="[
                (val: string) => !!val || 'Preenchimento Obrigatório',
              ]"
            />
          </div>
          <div class="row justify-center" style="margin-top: 20px !important">
            <q-btn flat color="primary" label="Anterior" @click="prevStep" />
            <q-btn
              :disable="saveDisabled"
              color="primary"
              label="Concluir"
              @click="save"
            />
          </div>
        </div>
      </q-form>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import GenderOptions from '@/types/Misc/Gender'

import ImageUploader from '@/components/misc/ImageUploader.vue'
import Autocomplete from '@/components/misc/autocompleteSearch.vue'

import UserService from '@/services/UserService'
import PersonalDataService from '@/services/PersonalDataService'
import AnthropometricDataService from '@/services/AnthropometricDataService'
import AntecedentService from '@/services/AntecedentService'
import SpecificityService from '@/services/SpecificityService'

import { validators } from '@/utils'
import DiagnosisService from '@/services/DiagnosisService'

export default defineComponent({
  components: {
    ImageUploader,
    Autocomplete,
  },
  data() {
    return {
      genders: [] as any[],
      repeatedPassword: null,
      breadcrumbs: [
        { label: 'Pacientes', icon: 'users', href: 'patient' },
        {
          label: 'Novo',
          href: 'patient-create-form',
        },
      ],
      step: 1,
      formChanged: false,
      object: {
        user: {
          email: null,
          password: null,
          profile_photo: undefined,
        },
        personalData: {
          first_name: null,
          last_name: null,
          occupation: null,
          gender: null,
          birthday: null,
          wake_up: null,
          bedtime: null,
          activity_level: null,
          food_history: null,
          user: null,
        },
        anthropometricData: {
          weight: null,
          height: null,
          waist_circumference: null,
          fat_mass: null,
          muscle_mass: null,
          bone_mass: null,
          body_water: null,
          basal_metabolism: null,
          visceral_fat: null,
          user: null,
        },
        diagnosis: {
          main: null,
          secondary: null,
          bowel_function: null,
          send_by_doctor: false,
          user: null,
        },
        antecedents: [] as any[],
        specificities: [] as any[],
      },
      saveDisabled: false,
    }
  },
  created() {
    this.genders = Object.values(GenderOptions)
  },
  methods: {
    isValidEmail(email: string) {
      return validators.isValidEmail(email)
    },
    isValidDate(date: string) {
      return validators.isValidDate(date)
    },
    isValidHour(hour: string) {
      return validators.isValidHour(hour)
    },
    addSpecificity() {
      this.object.specificities.push({
        food: null,
        specificity_type: null,
        user: null,
      })
    },
    addAntecedent() {
      this.object.antecedents.push({
        description: null,
        antecedent_type: null,
        user: null,
      })
    },
    async nextStep() {
      if (await this.$refs.form.validate()) {
        this.step++
      }
    },
    async prevStep() {
      this.step--
    },
    async goBack() {
      if (!this.formChanged || (await this.$confirmation('cancel'))) {
        this.$router.back()
      }
    },
    async save() {
      if (await this.$confirmation('save')) {
        this.saveDisabled = true
        const notif = this.$q.notify({
          group: false,
          spinner: true,
          message: 'A guardar...',
          position: 'bottom',
          timeout: 0,
        })

        let deleteIfFailed = {
          User: { service: UserService, value: null },
          PersonalData: { service: PersonalDataService, value: null },
          AnthropometricData: {
            service: AnthropometricDataService,
            value: null,
          },
          Diagnosis: { service: DiagnosisService, value: null },
          Antecedent: { service: AntecedentService, value: [] as String[] },
          Specificity: { service: SpecificityService, value: [] as String[] },
        }

        try {
          const user = (await UserService.post(this.object.user as any)).data
          deleteIfFailed.User.value = user.id

          this.object.personalData.user = user.id
          let d = this.object.personalData.birthday.split('/')

          const personalData = (
            await PersonalDataService.post(
              Object.assign({}, this.object.personalData, {
                birthday: `${d[2]}-${d[1]}-${d[0]}`,
              }) as any
            )
          ).data
          deleteIfFailed.PersonalData.value = personalData.id

          this.object.anthropometricData.user = user.id
          const anthropometricData = (
            await AnthropometricDataService.post(
              this.object.anthropometricData as any
            )
          ).data
          deleteIfFailed.AnthropometricData.value = anthropometricData.id

          this.object.diagnosis.user = user.id
          const diagnosis = (
            await DiagnosisService.post(this.object.diagnosis as any)
          ).data
          deleteIfFailed.Diagnosis.value = diagnosis.id

          for (const antecedent of this.object.antecedents) {
            antecedent.user = user.id
            let ant = (await AntecedentService.post(antecedent as any)).data
            deleteIfFailed.Antecedent.value.push(ant.id)
          }

          for (const specificity of this.object.specificities) {
            specificity.user = user.id
            let sp = (await SpecificityService.post(specificity as any)).data
            deleteIfFailed.Specificity.value.push(sp.id)
          }

          notif({
            spinner: false,
            color: 'positive',
            icon: 'fa-solid fa-circle-check',
            message: 'Concluído',
            timeout: 500,
          })
          this.$router.back()
        } catch (err) {
          notif({
            spinner: false,
            color: 'negative',
            icon: 'fa-solid fa-circle-xmark',
            message: 'Algo inesperado aconteceu!',
            timeout: 1000,
          })

          for (const key in deleteIfFailed) {
            const data = deleteIfFailed[key]
            if (Array.isArray(data.value)) {
              for (const id of data.value) {
                data.service.delete(id)
              }
            } else {
              data.service.delete(data.value)
            }
          }
        }
      }
    },
  },
})
</script>
<style scoped>
.q-stepper {
  background: transparent;
}
.q-stepper:deep(.q-stepper__content) {
  display: none;
}
.form-card {
  display: flex;
  flex-direction: column;
  width: 35vw;
  min-width: 500px;
}
.form-card > * {
  margin: 10px 10px 0 10px;
}
.form-card > .q-btn {
  margin-top: 25px;
}
.form-card > .row {
  width: 100%;
}
.form-card > .row > .row {
  flex-grow: 1;
}
.form-section-title {
  display: flex;
  align-items: center;
  font-weight: bold;
  color: #646464;
}
.no-results {
  justify-content: center;
}
</style>
