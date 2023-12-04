<template>
  <div
    class="row number-meals box-default"
    style="width: 100%; background: var(--q-primary)"
  >
    <span>
      {{ period }}
    </span>
    <q-separator vertical style="margin: 0 8px" />
    Válido até:
    <span style="font-size: 14px; margin-left: 4px">
      {{ validateDate }}
    </span>
    <q-space />
    <span style="font-size: 14px">
      {{ numberMeals }}
    </span>
    <q-separator vertical style="margin: 0 8px" />
    <span style="font-size: 14px">
      <q-icon
        :color="dateIndex > 0 ? 'white' : 'secondary'"
        name="fa-solid fa-chevron-left"
        :style="{
          marginRight: '8px',
          cursor: dateIndex > 0 ? 'pointer' : 'not-allowed',
        }"
        @click="dateIndex > 0 ? prevDate() : undefined"
      />
      {{ date }}
      <q-icon
        :color="dateIndex < dates.length - 1 ? 'white' : 'secondary'"
        name="fa-solid fa-chevron-right"
        :style="{
          marginRight: '8px',
          cursor: dateIndex < dates.length - 1 ? 'pointer' : 'not-allowed',
        }"
        @click="dateIndex < dates.length - 1 ? nextDate() : undefined"
      />
    </span>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import PeriodsDetails from '@/types/Misc/Periods'

import CalendarLocale from '@/assets/locales/calendar/pt-PT'

export default defineComponent({
  props: {
    modelValue: String,
    meals: Number,
    type: String,
    validateDate: String,
    dates: Array,
  },
  emits: ['update:modelValue'],
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
    dateIndex() {
      return this.dates.indexOf(this.date)
    },
    date: {
      get: function () {
        return this.modelValue
      },
      set: function (val: string) {
        this.$emit('update:modelValue', val)
      },
    },
    numberMeals: {
      get: function () {
        return `${this.meals} Refeiç${this.meals === 1 ? 'ão' : 'ões'}`
      },
    },
    period: {
      get: function () {
        return (
          this.periods.find((p) => p.value === this.type)?.description || ''
        )
      },
    },
  },
  methods: {
    prevDate() {
      this.date = this.dates[this.dateIndex - 1]
    },
    nextDate() {
      this.date = this.dates[this.dateIndex + 1]
    },
  },
})
</script>

<style scoped>
.number-meals {
  height: 60px;
  background: var(--q-primary);
  align-items: center;
  padding: 0 15px;
  margin: 20px 0;
  color: white;
}

.number-meals > span {
  font-weight: bold;
  font-size: 16px;
}
</style>
