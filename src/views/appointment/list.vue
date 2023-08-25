<template>
  <base-page
    title="Consultas"
    horizontal-alignment="center"
    vertical-alignment="center"
  >
    <template v-slot:right-header>
      <!-- <q-btn flat label="Anterior" color="primary" @click="calendarPrev" />
      <q-separator vertical />
      <q-btn flat label="Hoje" color="secondary" @click="calendarToday" />
      <q-separator vertical />
      <q-btn flat label="Próxima" color="primary" @click="calendarNext" /> -->
    </template>
    <template v-slot:content>
      <appointments-list />
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import AppointmentsList from '@/components/appointments/index.vue'

export default defineComponent({
  components: {
    AppointmentsList,
  },
})
</script>
