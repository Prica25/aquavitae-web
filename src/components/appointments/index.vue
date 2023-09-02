<template>
  <div class="col-12">
    <custom-table
      ref="table"
      :rows="events"
      :columns="columns"
      :loading="isLoading"
    >
      <template #description="{ row }">
        <div class="row">
          <q-avatar
            size="50px"
            color="primary"
            text-color="white"
            icon="fa-solid fa-user"
            style="margin-right: 12px"
          />
          <div class="patient-details">
            <span class="name">Kiran Acharya</span>
            <span class="gender-age">28 anos</span>
          </div>
        </div>
      </template>
      <template #status="{ row }">
        <q-chip size="16px" color="primary">{{ row.status }} </q-chip>
      </template>
    </custom-table>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import CustomTable from '@/components/misc/CustomTable.vue'

export default defineComponent({
  components: {
    CustomTable,
  },
  data() {
    return {
      // selectedDate: today(),
      isLoading: false,
      columns: [
        {
          name: 'description',
          label: 'Descrição',
          field: 'description',
        },
        {
          name: 'status',
          label: 'Estado',
          field: 'status',
        },
      ],
      events: [
        { description: 'asd', status: 'REALIZED' },
        { description: 'xcv', status: 'CANCELLED' },
        { description: 'fgh', status: 'CANCELLED' },
        { description: 'yui', status: 'SCHEDULED' },
        { description: 'jkl', status: 'SCHEDULED' },
      ],
    }
  },
  methods: {
    // statusDescription(status) {},
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
