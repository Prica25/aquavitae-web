<template>
  <base-page title="Dados do Paciente">
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
          <div class="row">
            <q-input
              outlined
              dense
              v-model="object.first_name"
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
              v-model="object.last_name"
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
          <q-select
            dense
            outlined
            v-model="object.gender"
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
            v-model="object.birthday"
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
              v-model="object.wake_up"
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
              v-model="object.bedtime"
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
          <q-input
            outlined
            dense
            v-model="object.occupation"
            label="Profissão"
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
          <autocomplete
            v-model="object.activity_level"
            type="ActivityLevel"
            value-key="id"
            label-key="description"
            label="Nível de Atividade"
          />

          <q-btn color="primary" label="Registar" type="submit" />
        </div>
      </q-form>
    </template>
  </base-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PersonalDataService from '@/services/PersonalDataService'

import GenderOptions from '@/types/Misc/Gender'
import UserRoleOptions from '@/types/Misc/UserRole'

import Autocomplete from '@/components/misc/autocompleteSearch.vue'
import { validators, formatDate } from '@/utils'

export default defineComponent({
  components: {
    Autocomplete,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      repeatedPassword: null,
      formChanged: false,
      roles: [] as any[],
      genders: [] as any[],
      object: {
        first_name: '',
        last_name: '',
        gender: '',
        birthday: '',
        bedtime: '',
        wake_up: '',
        password: '',
        role: '',
        occupation: '',
        activity_level: '',
      },
    }
  },
  async created() {
    this.genders = Object.values(GenderOptions)
    this.roles = [UserRoleOptions.ADMIN, UserRoleOptions.NUTRITIONIST]

    const personalData = (await PersonalDataService.show(this.id)).data[0]

    this.object.first_name = personalData.first_name
    this.object.last_name = personalData.last_name
    this.object.gender = personalData.gender
    this.object.birthday = formatDate(personalData.birthday, {
      showHour: false,
    })
    this.object.bedtime = formatDate(personalData.bedtime, {
      hideSeconds: true,
    })
    this.object.wake_up = formatDate(personalData.wake_up, {
      hideSeconds: true,
    })
    this.object.occupation = personalData.occupation
    this.object.activity_level = personalData.activity_level.id
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
    async goBack() {
      if (!this.formChanged || (await this.$confirmation('cancel'))) {
        this.$router.back()
      }
    },
    async save() {
      if (await this.$confirmation('save')) {
        try {
          let d = this.object.birthday.split('/')
          await PersonalDataService.put(this.id, {
            first_name: this.object.first_name,
            last_name: this.object.last_name,
            birthday: `${d[2]}-${d[1]}-${d[0]}`,
            bedtime: this.object.bedtime,
            wake_up: this.object.wake_up,
            gender: this.object.gender,
            activity_level: this.object.activity_level,
            occupation: this.object.occupation,
          })
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
</style>
