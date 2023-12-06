<template>
  <base-page title="Utilizadores" :breadcrumbs="breadcrumbs">
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
          <image-uploader v-model="object.profile_photo" :size="120" />
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

          <q-input
            outlined
            dense
            v-model="object.email"
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
          <autocomplete
            v-model="object.activity_level"
            type="ActivityLevel"
            value-key="id"
            label-key="description"
            label="Nível de Atividade"
          />
          <q-input
            outlined
            dense
            v-model="object.password"
            label="Password"
            type="password"
            :rules="[
              (val: string) =>
                (val && val.length >= 8) ||
                'A password deve ter mais de 8 caracteres',
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
                (val && val === object.password) ||
                'As passwords são diferentes',
            ]"
            hide-bottom-space
            @change="formChanged = true"
          />
          <q-select
            dense
            outlined
            v-model="object.role"
            :options="roles"
            option-value="value"
            option-label="description"
            label="Perfil"
            emit-value
            :rules="[
              (val: string) => !!val || 'Preenchimento Obrigatório',
            ]"
            hide-bottom-space
            map-options
          />

          <q-btn color="primary" label="Registar" type="submit" />
        </div>
      </q-form>
    </template>
  </base-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import UserService from '@/services/UserService'
import PersonalDataService from '@/services/PersonalDataService'

import GenderOptions from '@/types/Misc/Gender'
import UserRoleOptions from '@/types/Misc/UserRole'

import ImageUploader from '@/components/misc/ImageUploader.vue'
import Autocomplete from '@/components/misc/autocompleteSearch.vue'
import { validators } from '@/utils'

export default defineComponent({
  components: {
    ImageUploader,
    Autocomplete,
  },
  data() {
    return {
      repeatedPassword: null,
      breadcrumbs: [] as any[],
      formChanged: false,
      roles: [] as any[],
      genders: [] as any[],
      object: {
        first_name: '',
        last_name: '',
        email: '',
        gender: '',
        birthday: '',
        bedtime: '',
        wake_up: '',
        password: '',
        role: '',
        activity_level: '',
        profile_photo: '',
      },
    }
  },
  created() {
    this.breadcrumbs.push(
      {
        label: 'Utilizadores',
        icon: 'fa-solid fa-user',
        href: 'user',
      },
      {
        label: 'Novo',
        href: 'user-create-form',
      }
    )

    this.genders = Object.values(GenderOptions)
    this.roles = [UserRoleOptions.ADMIN, UserRoleOptions.NUTRITIONIST]
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
        let user_id = null
        try {
          const response = (
            await UserService.post({
              email: this.object.email,
              password: this.object.password,
              role: this.object.role,
              profile_photo: this.object.profile_photo,
            })
          ).data

          user_id = response.id
          let d = this.object.birthday.split('/')

          await PersonalDataService.post({
            first_name: this.object.first_name,
            last_name: this.object.last_name,
            birthday: `${d[2]}-${d[1]}-${d[0]}`,
            bedtime: this.object.bedtime,
            wake_up: this.object.wake_up,
            gender: this.object.gender,
            activity_level: this.object.activity_level,
            user: user_id,
          })
          this.$router.back()
        } catch (err) {
          console.log(err)
          if (user_id) {
            UserService.delete(user_id)
          }
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
