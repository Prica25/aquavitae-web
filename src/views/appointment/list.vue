<template>
  <base-page
    title="Consultas"
    horizontal-alignment="center"
    vertical-alignment="center"
  >
    <template #right-header>
      <q-btn flat label="Anterior" color="primary" @click="calendarPrev" />
      <q-separator vertical />
      <q-btn flat :label="formatedDate" color="secondary">
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
            :navigation-max-year-month="calendarSettings.navigationDate"
            :options="calendarSettings.options"
            :locale="calendarSettings.locale"
          />
        </q-popup-proxy>
      </q-btn>
      <q-separator vertical />
      <q-btn flat label="Próxima" color="primary" @click="calendarNext" />
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
        locale: {
          firstDayOfWeek: 1,
          months: [
            'Janeiro',
            'Fevereiro',
            'Março',
            'Abril',
            'Maio',
            'Junho',
            'Julho',
            'Agosto',
            'Setembro',
            'Outubro',
            'Novembro',
            'Dezembro',
          ],
          monthsShort: [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez',
          ],
          days: [
            'Domingo',
            'Segunda-feira',
            'Terça-feira',
            'Quarta-feira',
            'Quinta-feira',
            'Sexta-feira',
            'Sábado',
          ],
          daysShort: ['Dom', 'Seg', 'Terç', 'Qua', 'Qui', 'Sex', 'Sáb'],
        },
      },
    }
  },
  async created() {
    this.getAppointments()
  },
  computed: {
    formatedDate: {
      get() {
        return [
          this.selectedDate.getDate().toString().padStart(2, '0'),
          (this.selectedDate.getMonth() + 1).toString().padStart(2, '0'),
          this.selectedDate.getFullYear(),
        ].join('/')
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
