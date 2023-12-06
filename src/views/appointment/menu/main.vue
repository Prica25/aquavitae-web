<template>
  <base-page
    title="Consulta"
    horizontal-alignment="center"
    vertical-alignment="center"
    :breadcrumbs="breadcrumbs"
  >
    <template #right-header>
      <q-btn
        outline
        round
        color="primary"
        icon="fa-solid fa-check"
        @click="goBack"
      />
      <!-- <q-icon
        name="fa-solid fa-pen"
        color="primary"
        size="18px"
        style="cursor: pointer; margin: 0 12px"
      >
        <q-tooltip
          transition-show="flip-right"
          transition-hide="flip-left"
          style="font-size: 13px"
        >
          Alterar
        </q-tooltip>
      </q-icon> -->
    </template>
    <template #content>
      <div class="row justify-center">
        <Option
          v-for="(option, index) in options"
          :key="`settings-option-${index}`"
          :description="option.description"
          :icon="option.icon"
          :href="option.href"
          :params="option.params"
        ></Option>
      </div>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import Option from '@/components/settings/option.vue'

import AppointmentService from '@/services/AppointmentService'

export default defineComponent({
  props: {
    appointment_id: {
      type: String,
      required: true,
    },
  },
  components: {
    Option,
  },
  data() {
    return {
      appointment: null,
      breadcrumbs: [] as any[],
      user_id: null,
      options: [],
    }
  },
  async created() {
    this.appointment = (await AppointmentService.show(this.appointment_id)).data
    this.user_id = this.appointment.user.id

    this.options = [
      {
        description: 'Dados Antropométricos',
        icon: 'weight-scale',
        href: 'anthropometric-data',
        params: { user_id: this.user_id },
      },
      {
        description: 'Dados Bioquímicos',
        icon: 'file-medical',
        href: 'biochemical-data',
        params: { appointment_id: this.appointment_id },
      },
    ]
  },
  methods: {
    async goBack() {
      await AppointmentService.put(this.appointment.id, {
        user: this.appointment.user.id,
        nutritionist: this.appointment.nutritionist,
        date: this.appointment.date,
        goals: this.appointment.appointment_has_goals.map(
          (value: any) => value.id
        ),
        status: 'REALIZED',
      })
      this.$router.back()
    },
  },
})
</script>
<style scoped>
.content-slot {
  align-items: center;
  justify-content: center;
}
</style>
