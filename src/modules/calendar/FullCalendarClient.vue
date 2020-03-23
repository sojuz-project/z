<template>
  <FullCalendar
    :events="events"
    :plugins="calendarPlugins"
    @datesRender="(info) => $emit('datesRender', info)"
    default-view="dayGridMonth"
    :businessHours="[
      // specify an array instead
      {
        daysOfWeek: [1, 2, 3], // Monday, Tuesday, Wednesday
        startTime: '08:00', // 8am
        endTime: '18:00', // 6pm
      },
      {
        daysOfWeek: [4, 5], // Thursday, Friday
        startTime: '10:00', // 10am
        endTime: '16:00', // 4pm
      },
    ]"
  />
</template>

<script>
import dayGridPlugin from '@fullcalendar/daygrid';
import FullCalendar from '@fullcalendar/vue';

export default {
  components: {
    FullCalendar,
  },
  props: {
    events: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      calendarPlugins: [dayGridPlugin],
    };
  },
};
</script>

<style src="@fullcalendar/core/main.css"></style>
<style src="@fullcalendar/daygrid/main.css"></style>
