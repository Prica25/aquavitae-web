<template>
  <base-page
    title="Dados Antropométricos"
    horizontal-alignment="center"
    vertical-alignment="center"
    :breadcrumbs="breadcrumbs"
  >
    <template #right-header>
      <q-btn
        class="btn"
        color="primary"
        label="Adicionar Registo"
        @click="add"
        style="height: 56px"
      />
    </template>
    <template #content>
      <div class="col-6" style="margin: 12px">
        <div class="row box-default" style="margin: 8px 0; padding: 12px">
          <div class="col text-center">
            <b>Data</b>
          </div>
          <q-separator vertical />
          <div class="col text-center">
            <div class="row justify-center" style="align-items: center">
              <q-icon
                :color="
                  pagination.page !== pagination.totalPages ? 'primary' : 'grey'
                "
                name="fa-solid fa-chevron-left"
                style="margin-right: 8px; cursor: pointer"
                @click="
                  pagination.page !== pagination.totalPages
                    ? prevData()
                    : undefined
                "
              />
              {{ formatedDate }}
              <q-icon
                :color="pagination.page !== 1 ? 'primary' : 'grey'"
                name="fa-solid fa-chevron-right"
                style="margin-left: 8px; cursor: pointer"
                @click="pagination.page !== 1 ? nextData() : undefined"
              />
            </div>
          </div>
        </div>
        <div
          v-for="param in antropometricParams.slice(0, -1)"
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
            v-html="param.formatter(antropometricData?.[0]) || '...'"
          />
          <div v-if="!param.spacer && !param.formatter" class="col text-center">
            {{ antropometricData?.[param.value] || '...' }}
            <i>{{ param.unit ? param.unit : '' }}</i>
          </div>
        </div>
      </div>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import AnthropometricDataService from '@/services/AnthropometricDataService'
import PersonalDataService from '@/services/PersonalDataService'

import type AnthropometricData from '@/types/AnthropometricData'
import type PersonalData from '@/types/PersonalData'

import { formatDate } from '@/utils'

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
      antropometricData: null as AnthropometricData | null,
      antropometricParams: [
        { spacer: true },
        { label: 'Peso', value: 'weight', unit: 'kg' },
        { label: 'Altura', value: 'height', unit: 'cm' },
        { label: 'IMC', value: 'bmi', estimated: true, formatter: this.getBMI },
        {
          label: 'Circunferência da Cintura',
          value: 'waist_circumference',
          unit: 'cm',
        },
        { label: 'Massa Gorda', value: 'fat_mass', unit: 'kg' },
        { label: 'Massa Muscular', value: 'muscle_mass', unit: 'kg' },
        { label: 'Massa Óssea', value: 'bone_mass', unit: 'kg' },
        { label: 'Água corporal', value: 'body_water', unit: '%' },
        {
          label: 'Metabolismo Basal',
          value: 'basal_metabolism',
          unit: 'kcal/dia',
        },
        { label: 'Gordura Visceral', value: 'visceral_fat' },
        { label: 'Body Photo', value: 'body_photo' },
      ],
      pagination: {
        page: 1,
        rowsPerPage: 1,
        totalPages: 1,
      },
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
        label: 'Dados Antropométrico',
        href: 'anthropometric-data',
        params: { user_id: this.user_id },
      }
    )
  },
  async mounted() {
    this.getData()
  },
  computed: {
    formatedDate() {
      if (this.antropometricData) {
        return formatDate(this.antropometricData.date, { showHour: false })
      }
      return '../../....'
    },
  },
  methods: {
    async getData() {
      const data = (
        await AnthropometricDataService.index(
          this.pagination.page,
          this.pagination.rowsPerPage,
          this.user_id,
          this.antropometricParams
            .map((column) => (!column.estimated ? column.value : false))
            .filter((v: string | boolean) => !!v)
        )
      ).data
      this.antropometricData = data.data?.[0] as AnthropometricData
      this.pagination.totalPages = data.count
    },
    prevData() {
      this.pagination.page++
      this.getData()
    },
    nextData() {
      this.pagination.page--
      this.getData()
    },
    add() {
      this.$router.push({
        name: 'anthropometric-data-create-form',
        params: { user_id: this.user_id },
      })
    },
    getBMI() {
      if (this.antropometricData?.weight && this.antropometricData?.height) {
        const heightInMeters = this.antropometricData.height / 100
        return (
          (
            this.antropometricData.weight /
            (heightInMeters * heightInMeters)
          ).toFixed(2) + ' <i>kg/m2</i>'
        )
      }
      return ''
    },
  },
})
</script>
