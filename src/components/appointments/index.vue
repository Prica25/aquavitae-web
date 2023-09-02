<template>
  <div class="col-12">
    <custom-table
      ref="table"
      :rows="appointments"
      :columns="columns"
      :loading="isLoading"
    >
      <template v-slot:user="{ row }">
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
    </custom-table>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

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
      isLoading: false,
      columns: [
        {
          name: 'user',
          label: 'Paciente',
          field: 'user',
        },
      ],
    }
  },
  methods: {
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
