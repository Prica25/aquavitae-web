<template>
  <base-page
    title="Dados Antropométricos"
    horizontal-alignment="center"
    vertical-alignment="center"
  >
    <template #content>
      <div class="col-6" style="margin: 12px">
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
            {{ antropometricData?.[0]?.[param.value] || '...' }}
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

import type AnthropometricData from '@/types/AnthropometricData'

export default defineComponent({
  props: {
    user_id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      antropometricData: [] as AnthropometricData[],
      antropometricParams: [
        { label: 'Data', value: 'date', formatter: this.formatDate },
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
    }
  },
  async mounted() {
    this.antropometricData = (
      await AnthropometricDataService.index(
        1,
        10,
        this.user_id,
        this.antropometricParams
          .map((column) => (!column.estimated ? column.value : false))
          .filter((v: string | boolean) => !!v)
      )
    ).data.data
    console.log(this.antropometricData)
  },
  methods: {
    getBMI(antropometricData: AnthropometricData) {
      if (antropometricData?.weight && antropometricData?.height) {
        const heightInMeters = antropometricData.height / 100
        return (
          (
            antropometricData.weight /
            (heightInMeters * heightInMeters)
          ).toFixed(2) + ' <i>kg/m2</i>'
        )
      }
      return ''
    },
    formatDate(antropometricData: AnthropometricData) {
      return 'xxx'
    },
  },
})
</script>
