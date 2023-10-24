<template>
  <base-page
    title="Dados do Paciente"
    horizontal-alignment="center"
    vertical-alignment="center"
    :breadcrumbs="breadcrumbs"
  >
    <template #right-header>
      <q-btn
        class="btn"
        color="primary"
        label="Alterar Dados"
        @click="update"
      />
    </template>
    <template #content>
      <div class="col-6" style="margin: 12px">
        <div
          v-for="param in personalParams"
          :class="{ row: true, 'box-default': !param.spacer }"
          :style="
            param.spacer ? 'margin: 14px 0;' : 'margin: 8px 0; padding: 12px'
          "
        >
          <div v-if="!param.spacer" class="col text-center">
            <b>{{ param.label }}</b>
          </div>
          <q-separator v-if="!param.spacer" vertical />
          <div
            v-if="!param.spacer && param.formatter"
            class="col text-center"
            v-html="param.formatter(personalData[param.value])"
          />
          <div v-if="!param.spacer && !param.formatter" class="col text-center">
            {{
              personalData
                ? getValue(personalData, param.value) || '...'
                : '...'
            }}
            <i>{{ param.unit ? param.unit : '' }}</i>
          </div>
        </div>
      </div>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import PersonalDataService from '@/services/PersonalDataService'

import GenderDetails from '@/types/Misc/Gender'
import type PersonalData from '@/types/PersonalData'

export default defineComponent({
  props: {
    user_id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      breadcrumbs: [] as any[],
      personalData: {} as PersonalData,
      personalParams: [
        { label: 'Primeiro Nome', value: 'first_name' },
        { label: 'Último Nome', value: 'last_name' },
        {
          label: 'Data de Nascimento',
          value: 'birthday',
          formatter: this.formatDate,
        },
        { label: 'Profissão', value: 'occupation' },
        {
          label: 'Hora de Acordar',
          value: 'wake_up',
          formatter: this.formatHour,
        },
        {
          label: 'Hora de Deitar',
          value: 'bedtime',
          formatter: this.formatHour,
        },

        { label: 'Nível de Atividade', value: 'activity_level.description' },
        { label: 'Género', value: 'gender', formatter: this.formatGender },
      ],
    }
  },
  async created() {
    let personalData = (await PersonalDataService.show(this.user_id))
      .data[0] as PersonalData
    this.breadcrumbs.push(
      { label: 'Pacientes', icon: 'users', href: 'patient' },
      {
        label: `${personalData.first_name} ${personalData.last_name}`,
        href: 'menu-user',
        params: { user_id: this.user_id },
      },
      {
        label: 'Dados do Paciente',
        href: 'personal-data',
        params: { user_id: this.user_id },
      }
    )
  },
  async mounted() {
    this.personalData = (await PersonalDataService.show(this.user_id)).data[0]
  },
  methods: {
    getValue(data: any, key: string): string | null {
      if (key.includes('.')) {
        const keys = key.split('.')
        return this.getValue(data[keys[0]], keys.slice(-1).join('.'))
      }
      return data?.[key]
    },
    update() {
      this.$router.push({
        name: 'personal-data-update-form',
        params: { user_id: this.user_id },
      })
    },
    formatDate(birthday: string | null) {
      return birthday?.split('-').reverse().join('/') || '../../....'
    },
    formatHour(hour: string | null) {
      if (hour) {
        const h = hour.match(/^[0-9]{2}:[0-9]{2}/g)?.[0]
        if (h) {
          return `${h}h`
        }
      }
      return '..:..'
    },
    formatGender(gender: string) {
      return GenderDetails[gender]?.description || '...'
    },
  },
})
</script>
