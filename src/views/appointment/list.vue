<template>
  <base-page
    title="Consultas"
    horizontal-alignment="center"
    vertical-alignment="center"
  >
    <template #right-header>
      <q-btn
        class="btn"
        flat
        label="Anterior"
        color="primary"
        @click="calendarPrev"
      />
      <q-separator vertical />
      <q-btn class="btn" flat :label="formatedDate" color="secondary">
        <q-popup-proxy
          transition-show="scale"
          transition-hide="scale"
          :offset="[91, 12]"
        >
          <q-date
            class="box-default"
            v-model="formatedDate"
            mask="DD/MM/YYYY"
            minimal
            :locale="calendarSettings.locale"
          />
        </q-popup-proxy>
      </q-btn>
      <q-separator vertical />
      <q-btn
        class="btn"
        flat
        label="Próxima"
        color="primary"
        @click="calendarNext"
      />
      <q-btn
        class="btn"
        color="primary"
        label="Agendar"
        @click="$emit('click-button')"
        style="margin-left: 12px"
      />
    </template>
    <template #content>
      <appointments-list :appointments="rows" />
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import type ResponseList from '@/types/ResponseList'
import AppointmentService from '@/services/AppointmentService'

import AppointmentsList from '@/components/appointments/index.vue'

import CalendarLocale from '@/assets/locales/calendar/pt-PT.ts'

import { formatDate } from '@/utils'

export default defineComponent({
  components: {
    AppointmentsList,
  },
  data() {
    return {
      selectedDate: new Date(),
      rows: [] as any[],
      pagination: {
        page: 1,
        rowsPerPage: 10,
        pagesNumber: 0,
        rowsNumber: 0,
      },
      calendarSettings: {
        locale: CalendarLocale,
      },
    }
  },
  async created() {
    this.getAppointments()
  },
  computed: {
    formatedDate: {
      get() {
        return formatDate(this.selectedDate, {
          showHour: false,
        })
      },
      set(value: string) {
        let d = value.split('/')
        this.selectedDate = new Date(`${d[2]}-${d[1]}-${d[0]}`)
      },
    },
  },
  watch: {
    selectedDate() {
      this.getAppointments()
    },
  },
  methods: {
    async getAppointments() {
      let response = (
        await AppointmentService.index(
          this.pagination.page,
          this.pagination.rowsPerPage,
          `date:ASC`,
          ['date', 'status', 'user', 'nutritionist', 'appointment_has_goals'],
          `date:${this.selectedDate.toISOString().split('T')[0]}`
        )
      ).data as ResponseList

      this.pagination.rowsNumber = response.count
      this.pagination.pagesNumber = response.last_page
      this.rows = response.data
    },
    calendarNext() {
      this.selectedDate = new Date(
        this.selectedDate.getTime() + 60 * 60 * 24 * 1000
      )
    },
    calendarPrev() {
      this.selectedDate = new Date(
        this.selectedDate.getTime() - 60 * 60 * 24 * 1000
      )
    },
  },
})
</script>
<style scoped>
.btn {
  height: 56px;
}
</style>
