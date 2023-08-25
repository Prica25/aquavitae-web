<template>
  <div class="col-12">
    <custom-table
      ref="table"
      :rows="events"
      :columns="columns"
      :loading="isLoading"
    >
      <template v-slot:description="{ row }">
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
          name: 'description',
          label: 'Descrição',
          field: 'status',
        },
      ],
      events: [
        { description: 'asd' },
        { description: 'xcv' },
        { description: 'fgh' },
        { description: 'yui' },
        { description: 'jkl' },
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
