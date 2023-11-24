<template>
  <div class="row number-meals box-default" style="width: 100%">
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
      style="width: 200px"
    />
    <q-separator vertical style="margin: 0 8px" />
    <q-input
      outlined
      dense
      v-model="date"
      label="Validade"
      mask="##/##/####"
      style="width: 150px"
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
      style="width: 200px"
    />
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import PeriodsDetails from '@/types/Misc/Periods'

import CalendarLocale from '@/assets/locales/calendar/pt-PT'

export default defineComponent({
  emits: ['update:meals', 'update:type', 'update:validateDate'],
  props: {
    meals: Number,
    type: String,
    validateDate: String,
    recommendedMeals: Number,
  },
  data() {
    return {
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
  },
})
</script>

<style scoped>
.number-meals {
  height: 60px;
  background: white;
  align-items: center;
  padding: 0 15px;
  margin: 20px 0;
}

.number-meals > span {
  color: #646464;
  font-weight: bold;
  font-size: 16px;
}
</style>
