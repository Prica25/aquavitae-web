<template>
  <base-page title="Consultas" :breadcrumbs="breadcrumbs">
    <template #right-header>
      <q-btn
        outline
        round
        color="negative"
        icon="fa-solid fa-xmark"
        @click="goBack"
      />
    </template>
    <template #content>
      <q-form
        ref="form"
        @submit="save"
        class="items-center justify-center"
        style="display: flex; width: 100%; height: 100%; flex-direction: column"
      >
        <div
          class="box-default q-pa-xl text-center form-card"
          style="min-width: 60vw"
        >
          <div class="row">
            <div class="col" style="min-width: unset">
              <q-date
                v-model="formatedDate"
                mask="DD/MM/YYYY HH:mm"
                :locale="calendarSettings.locale"
              />
            </div>
            <div class="col" style="min-width: unset">
              <q-time
                v-model="formatedDate"
                mask="DD/MM/YYYY HH:mm"
                color="secondary"
                format24h
              />
            </div>
            <div class="col" style="display: flex; flex-flow: column">
              <autocomplete
                v-model="object.nutritionist"
                @update:model-value="formChanged = true"
                label="Nutricionista"
                type="User"
                value-key="id"
                label-key="email"
                default-filter="role:NUTRITIONIST"
                :rules="[(val) => !!val || 'Campo Obrigatório']"
              />
              <autocomplete
                v-model="object.user"
                @update:model-value="formChanged = true"
                label="Paciente"
                type="User"
                value-key="id"
                label-key="email"
                default-filter="role:USER"
                :rules="[(val) => !!val || 'Campo Obrigatório']"
              />
              <q-separator />
              <autocomplete
                v-model="goal"
                @update:model-value="addGoal"
                label="Adicionar Objetivo"
                type="AppointmentGoal"
                value-key="id"
                label-key="description"
                return-object
                multi
                :rules="[
                  () =>
                    (object.goals && object.goals.length > 0) ||
                    'Campo Obrigatório',
                ]"
              />
              <div class="goals-list">
                <div v-for="goal in object.goals" class="row box-default">
                  <span>{{ goal.description }}</span>
                  <q-space />
                  <q-icon
                    name="fa-solid fa-trash"
                    color="negative"
                    style="cursor: pointer; margin: 0 8px"
                    @click="removeGoal(goal.id)"
                  />
                </div>
              </div>
            </div>
          </div>

          <q-btn color="primary" label="Agendar" type="submit" />
        </div>
      </q-form>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import Autocomplete from '@/components/misc/autocompleteSearch.vue'

import CalendarLocale from '@/assets/locales/calendar/pt-PT.ts'
import { formatDate } from '@/utils'

import AppointmentService from '@/services/AppointmentService.ts'

export default defineComponent({
  components: {
    Autocomplete,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      breadcrumbs: [] as any[],
      formChanged: false,
      object: {
        date: new Date(),
        nutritionist: null,
        user: null,
        status: 'SCHEDULED',
        goals: [] as string[],
      },
      goal: null,
      calendarSettings: {
        locale: CalendarLocale,
      },
    }
  },
  computed: {
    formatedDate: {
      get() {
        return formatDate(this.object.date)
      },
      set(value: string) {
        const [date, hour] = value.split(' ')
        let d = date.split('/')
        this.object.date = new Date(`${d[2]}-${d[1]}-${d[0]} ${hour}`)
      },
    },
  },
  async created() {
    this.breadcrumbs.push(
      { label: 'Consultas', icon: 'calendar-days', href: 'appointment' },
      {
        label: 'Reagendar',
        href: 'appointment-update-form',
      }
    )

    const object = (await AppointmentService.show(this.id)).data
    this.object.date = new Date(object.date)
    this.object.nutritionist = object.nutritionist
    this.object.user = object.user.id
    this.object.status = object.status
    this.object.goals = object.appointment_has_goals
  },
  methods: {
    addGoal() {
      this.formChanged = true
      if (
        this.object.goals.findIndex((value) => value.id === this.goal.id) === -1
      ) {
        this.object.goals.push(this.goal)
      }
      this.goal = null
    },
    removeGoal(id: string) {
      const index = this.object.goals.findIndex((goal) => goal.id === id)
      this.object.goals.splice(index, 1)
    },
    async goBack() {
      if (!this.formChanged || (await this.$confirmation('cancel'))) {
        this.$router.back()
      }
    },
    async save() {
      if (await this.$confirmation('save')) {
        const notif = this.$q.notify({
          group: false,
          spinner: true,
          message: 'A guardar...',
          position: 'bottom',
          timeout: 0,
        })
        try {
          const obj = {
            ...this.object,
            goals: this.object.goals.map((v) => v.id),
          }
          await AppointmentService.put(this.id, obj)
          notif({
            spinner: false,
            color: 'positive',
            icon: 'fa-solid fa-circle-check',
            message: 'Concluído',
            timeout: 500,
          })
          this.$router.back()
        } catch (err) {
          notif({
            spinner: false,
            color: 'negative',
            icon: 'fa-solid fa-circle-xmark',
            message: 'Algo inesperado aconteceu!',
            timeout: 1000,
          })
        }
      }
    },
  },
})
</script>
<style scoped>
.form-card {
  width: 35vw;
  min-width: 500px;
}
.form-card *:not(.goals-list *) {
  margin: 10px 10px 0 10px;
}
.form-card > .q-btn {
  margin-top: 25px;
}
.goals-list {
  flex: 1 1 auto;
  border-radius: 4px;
  overflow-y: scroll;
  background: #f5f5f5;
  border: 1px solid rgba(0, 0, 0, 0.24);
  max-height: 215px;
}
.goals-list * {
  margin: 8px;
  font-size: 12px;
}
</style>
