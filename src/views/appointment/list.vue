<template>
  <base-page title="Consultas">
    <template v-slot:right-header>
      <q-btn flat label="Anterior" color="primary" @click="calendarPrev" />
      <q-separator vertical />
      <q-btn flat label="Hoje" color="secondary" @click="calendarToday" />
      <q-separator vertical />
      <q-btn flat label="Próxima" color="primary" @click="calendarNext" />
    </template>
    <template v-slot:content>
      <q-calendar-day
        ref="calendar"
        view="week"
        v-model="selectedDate"
        :weekdays="[1, 2, 3, 4, 5, 6, 0]"
        :interval-start="8"
        :interval-count="12"
        :date-header="dateHeader"
        :weekday-align="weekdayAlign"
        :date-align="dateAlign"
        hour24-format
        locale="pt"
        animated
        bordered
        transition-prev="slide-right"
        transition-next="slide-left"
        style="margin-top: 50px"
      >
        <!-- <template
          #day-body="{ scope: { timestamp, timeStartPos, timeDurationHeight } }"
        >
          <template v-for="event in getEvents(timestamp.date)" :key="event.id">
            <div
              v-if="event.time !== undefined"
              class="my-event"
              :class="badgeClasses(event, 'body')"
              :style="
                badgeStyles(event, 'body', timeStartPos, timeDurationHeight)
              "
            >
              <span class="title q-calendar__ellipsis">
                {{ event.title }}
                <q-tooltip>{{ event.details }}</q-tooltip>
              </span>
            </div>
          </template>
        </template> -->
      </q-calendar-day>
    </template>
  </base-page>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import { QCalendarDay, today } from '@quasar/quasar-ui-qcalendar/src/index.js'
import '@quasar/quasar-ui-qcalendar/src/QCalendarVariables.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarTransitions.sass'
import '@quasar/quasar-ui-qcalendar/src/QCalendarDay.sass'

export default defineComponent({
  components: {
    QCalendarDay,
  },
  data() {
    return {
      selectedDate: today(),
      dateAlign: 'center',
      weekdayAlign: 'center',
      dateHeader: 'stacked',
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
