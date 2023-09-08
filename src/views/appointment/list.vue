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
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date v-model="formatedDate" mask="DD/MM/YYYY" minimal />
        </q-popup-proxy>
      </q-btn>

      <!-- <span
        style="
          padding: 4px 16px;
          font-weight: 500;
          color: var(--q-secondary) !important;
          user-select: none;
        "
      >
        {{ formatedDate }}
      </span> -->
      <q-separator vertical />
      <q-btn flat label="Próxima" color="primary" @click="calendarNext" />
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
      rows: [],
      pagination: {
        page: 1,
        rowsPerPage: 10,
        pagesNumber: 0,
        rowsNumber: 0,
      },
    }
  },
  async created() {
    this.getAppointments()
    // this.rows = [
    //   Object.assign({}, response.data[0], { status: 'REALIZED' }),
    //   ...response.data,
    //   Object.assign({}, response.data[0], { status: 'CANCELLED' }),
    // ]
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
        this.selectedDate = new Date(d[2] + '/' + d[1] + '/' + d[0])
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
      this.rows = [
        Object.assign({}, response.data[0], { status: 'CANCELLED' }),
        ...response.data,
        Object.assign({}, response.data[0], { status: 'REALIZED' }),
      ]
    },
  },
})
</script>
