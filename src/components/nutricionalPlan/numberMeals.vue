<template>
  <div class="q-pa-md row number-meals box-default" style="width: 100%">
    <q-select
      outlined
      v-model="period"
      :options="periods"
      dense
      option-value="value"
      option-label="description"
      label="Tipo de Plano"
      emit-value
      map-options
      style="width: 150px"
      dark
      color="white"
    />
    <q-separator vertical style="margin: 0 8px" dark />
    <q-input
      outlined
      dense
      v-model="date"
      label="Validade"
      mask="##/##/####"
      style="width: 150px"
      dark
      color="white"
    >
      <q-popup-proxy
        transition-show="scale"
        transition-hide="scale"
        :offset="[91, 12]"
      >
        <q-date
          class="box-default"
          v-model="date"
          mask="DD/MM/YYYY"
          minimal
          :locale="calendarSettings.locale"
        />
      </q-popup-proxy>
    </q-input>
    <q-space />
    <q-select
      outlined
      v-model="numberMeals"
      :options="mealsOptions"
      dense
      emit-value
      map-options
      style="min-width: 120px"
      dark
      color="white"
    />
    <q-separator vertical style="margin: 0 8px" dark />
    <span style="font-size: 14px">
      <q-icon
        :color="dateIndex > 0 ? 'white' : 'secondary'"
        name="fa-solid fa-chevron-left"
        :style="{
          marginRight: '8px',
          cursor: dateIndex > 0 ? 'pointer' : 'not-allowed',
        }"
        @click="dateIndex > 0 ? dateIndex-- : undefined"
      />
      {{ visibleDay }}
      <q-icon
        :color="dateIndex < dates.length - 1 ? 'white' : 'secondary'"
        name="fa-solid fa-chevron-right"
        :style="{
          marginLeft: '8px',
          cursor: dateIndex < dates.length - 1 ? 'pointer' : 'not-allowed',
        }"
        @click="dateIndex < dates.length - 1 ? dateIndex++ : undefined"
      />
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import PeriodsDetails from '@/types/Misc/Periods'

import CalendarLocale from '@/assets/locales/calendar/pt-PT'

import { formatDate } from '@/utils'

export default defineComponent({
  emits: [
    'update:visibleDay',
    'update:meals',
    'update:type',
    'update:validateDate',
  ],
  props: {
    meals: Number,
    type: String,
    validateDate: String,
    visibleDay: String,
    recommendedMeals: Number,
  },
  data() {
    return {
      tomorrow: new Date(Date.now() + 60 * 60 * 24 * 1000),
      periods: [] as any[],
      options: [],
      calendarSettings: {
        locale: CalendarLocale,
      },
    }
  },
  created() {
    this.periods = Object.values(PeriodsDetails)
  },
  computed: {
    mealsOptions() {
      let options = []
      for (
        let index = (this.recommendedMeals || 0) - 2;
        index <= (this.recommendedMeals || 0) + 2;
        index++
      ) {
        if (index > 0) {
          options.push({
            label: `${index} Refeiç${index === 1 ? 'ão' : 'ões'}${
              index === this.recommendedMeals ? ' (Recomendado)' : ''
            }`,
            value: index,
          })
        }
      }
      return options
    },
    numberMeals: {
      get: function () {
        return this.meals
      },
      set: function (value: number) {
        this.$emit('update:meals', value)
      },
    },
    period: {
      get: function () {
        return this.type
      },
      set: function (value: string) {
        this.$emit('update:type', value)
      },
    },
    date: {
      get: function () {
        return this.validateDate
      },
      set: function (value: string) {
        this.$emit('update:validateDate', value)
      },
    },
    dates() {
      let d = this.date.split('/')
      let lastDay = new Date(parseInt(d[2]), parseInt(d[1]) - 1, parseInt(d[0]))
      const dias = Math.floor(
        (lastDay.getTime() - new Date().getTime()) / 1000 / 60 / 60 / 24 + 1
      )

      let dates = []
      for (let index = 1; index <= dias; index++) {
        let newDate = new Date()
        newDate.setDate(newDate.getDate() + index)
        dates.push(formatDate(newDate, { showHour: false }))
      }
      return dates
    },
    dateIndex: {
      get(): number {
        let index = this.dates.indexOf(this.visibleDay)
        if (index === -1) {
          this.$emit('update:visibleDay', this.dates[0])
        }
        return index || 0
      },
      set(value: number) {
        this.$emit('update:visibleDay', this.dates[value])
      },
    },
  },
})
</script>

<style scoped>
.number-meals {
  /* height: 60px; */
  background: var(--q-primary);
  align-items: center;
  /* padding: 0 15px; */
  margin: 20px 0;
  color: white;
}

.number-meals > span {
  font-weight: bold;
  font-size: 16px;
}
</style>
