<template>
  <div class="col-12">
    <custom-table
      ref="table"
      :rows="appointments"
      :columns="columns"
      :loading="isLoading"
      disableTooltip
    >
      <template #user="{ row }">
        <div class="row">
          <q-avatar
            size="50px"
            color="primary"
            text-color="white"
            icon="fa-solid fa-user"
            style="margin-right: 12px"
          />
          <div class="patient-details">
            <span class="name">{{ row.user.email }}</span>
            <span class="gender-age">28 anos</span>
          </div>
        </div>
      </template>
      <template #date="{ row }">
        {{ getHour(row.date) }}
      </template>
      <template #status="{ row }">
        <q-chip
          size="16px"
          text-color="white"
          :color="AppointmentStatus[row.status].color"
        >
          {{ AppointmentStatus[row.status].description }}
        </q-chip>
      </template>
      <template #appointment_has_goals="{ row }">
        <div class="row">
          <q-chip size="16px">
            {{ row.appointment_has_goals[0].description }}
          </q-chip>
          <div v-if="row.appointment_has_goals.length > 1">
            <q-chip size="16px">
              {{ `+${row.appointment_has_goals.length - 1}` }}
            </q-chip>
            <q-tooltip
              transition-show="flip-right"
              transition-hide="flip-left"
              style="font-size: 13px"
            >
              <div class="col">
                <span v-for="goal in row.appointment_has_goals.slice(1)">
                  {{ goal.description }}
                  <br />
                </span>
              </div>
            </q-tooltip>
          </div>
        </div>
      </template>
      <template #actions="{ row }">
        <span style="font-size: 16px">
          <q-icon
            name="fa-solid fa-user-check"
            color="positive"
            style="cursor: pointer; margin: 0 8px"
          />
          <q-icon
            name="fa-solid fa-user-clock"
            color="warning"
            style="cursor: pointer; margin: 0 8px"
          />
          <q-icon
            name="fa-solid fa-user-times"
            color="negative"
            style="cursor: pointer; margin: 0 2px 0 8px"
          />
        </span>
      </template>
    </custom-table>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import AppointmentStatus from '@/types/AppointmentStatus'
import CustomTable from '@/components/misc/CustomTable.vue'

export default defineComponent({
  props: {
    appointments: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    CustomTable,
  },
  data() {
    return {
      AppointmentStatus,
      isLoading: false,
      columns: [
        {
          name: 'user',
          label: 'Paciente',
          field: 'user',
          sortable: false,
        },
        {
          name: 'date',
          label: 'Hora de Marcação',
          field: 'date',
          align: 'center',
        },
        {
          name: 'status',
          label: 'Estado',
          field: 'status',
          align: 'center',
          sortable: false,
        },
        {
          name: 'appointment_has_goals',
          label: 'Objetivos',
          field: 'appointment_has_goals',
          sortable: false,
        },
        {
          name: 'actions',
          align: 'right',
          label: 'Ações',
          field: 'actions',
          sortable: false,
          size: '100px',
        },
      ],
    }
  },
  methods: {
    getHour(date: string) {
      return (
        new Date(date)
          .toISOString()
          .match(/[0-9-]{10}T([0-9]{2}:[0-9]{2}):[0-9.]{6}Z/)?.[1] || 'N/D'
      )
    },
    calendarToday() {
      let calendar = this.$refs.calendar as any
      calendar.moveToToday()
    },
    calendarNext() {
      let calendar = this.$refs.calendar as any
      calendar.next()
    },
    calendarPrev() {
      let calendar = this.$refs.calendar as any
      calendar.prev()
    },
  },
})
</script>
<style scoped>
.patient-details {
  display: flex;
  flex-direction: column;
}

.patient-details .name {
  font-weight: bold;
  font-size: 1.2em;
}
</style>
