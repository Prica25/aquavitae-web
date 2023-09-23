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
          <user-photo
            :photo="row.user.profile_photo"
            :size="50"
            style="margin-right: 12px"
          />
          <div class="patient-details">
            <span class="name">{{ getFullName(row.user.id) }}</span>
            <span class="gender-age">{{ getAge(row.user.id) }}</span>
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
          :color="AppointmentStatusDetails[row.status as AppointmentStatus].color"
        >
          {{ AppointmentStatusDetails[row.status as AppointmentStatus].description }}
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
          >
            <q-tooltip
              transition-show="flip-right"
              transition-hide="flip-left"
              style="font-size: 13px"
            >
              Registo
            </q-tooltip>
          </q-icon>

          <q-icon
            name="fa-solid fa-user-clock"
            color="warning"
            style="cursor: pointer; margin: 0 8px"
          >
            <q-tooltip
              transition-show="flip-right"
              transition-hide="flip-left"
              style="font-size: 13px"
            >
              Reagendar
            </q-tooltip>
          </q-icon>
          <q-icon
            name="fa-solid fa-user-times"
            color="negative"
            style="cursor: pointer; margin: 0 2px 0 8px"
          >
            <q-tooltip
              transition-show="flip-right"
              transition-hide="flip-left"
              style="font-size: 13px"
            >
              Cancelar
            </q-tooltip>
          </q-icon>
        </span>
      </template>
    </custom-table>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import PersonalDataService from '@/services/PersonalDataService'

import AppointmentStatusDetails from '@/types/Misc/AppointmentStatus'
import type Appointment from '@/types/Appointment'
import type AppointmentStatus from '@/types/Enum/AppointmentStatus'
import type PersonalData from '@/types/PersonalData'

import CustomTable from '@/components/misc/CustomTable.vue'
import UserPhoto from '@/components/patient/photo.vue'

export default defineComponent({
  props: {
    appointments: {
      type: Array,
      default: () => [],
    },
  },
  components: {
    CustomTable,
    UserPhoto,
  },
  data() {
    return {
      AppointmentStatusDetails,
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
      personalDataList: [] as Array<PersonalData>,
    }
  },
  watch: {
    appointments: {
      async handler(val) {
        const userIds = [
          ...new Set(
            val.map((appointment: Appointment) => appointment.user.id)
          ),
        ] as string[]
        this.personalDataList = (await PersonalDataService.show(userIds)).data
      },
      immediate: true,
    },
  },
  methods: {
    getHour(date: string) {
      return (
        new Date(date)
          .toISOString()
          .match(/[0-9-]{10}T([0-9]{2}:[0-9]{2}):[0-9.]{6}Z/)?.[1] || 'N/D'
      )
    },
    getFullName(user_id: string) {
      const personalData = this.personalDataList.find(
        (pd: PersonalData) => pd.user.id === user_id
      ) as PersonalData

      return personalData
        ? `${personalData.first_name} ${personalData.last_name}`
        : 'Desconhecido'
    },
    getAge(user_id: string) {
      const personalData = this.personalDataList.find(
        (pd: PersonalData) => pd.user.id === user_id
      ) as PersonalData

      if (personalData) {
        const date = new Date(personalData.birthday)
        const today = new Date()

        let age = today.getFullYear() - date.getFullYear()
        const m = today.getMonth() - date.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < date.getDate())) {
          age--
        }

        return `${age} anos`
      }
      return 'Sem informações'
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
