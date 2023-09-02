<template>
  <base-page
    title="Consultas"
    horizontal-alignment="center"
    vertical-alignment="center"
  >
    <template #right-header>
      <!-- <q-btn flat label="Anterior" color="primary" @click="calendarPrev" />
      <q-separator vertical />
      <q-btn flat label="Hoje" color="secondary" @click="calendarToday" />
      <q-separator vertical />
      <q-btn flat label="Próxima" color="primary" @click="calendarNext" /> -->
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
    let response = (
      await AppointmentService.index(
        this.pagination.page,
        this.pagination.rowsPerPage,
        `date:ASC`,
        ['date', 'status', 'user', 'nutritionist', 'appointment_has_goals']
      )
    ).data as ResponseList

    this.pagination.rowsNumber = response.count
    this.pagination.pagesNumber = response.last_page
    this.rows = response.data

    console.log(response)
  },
})
</script>
