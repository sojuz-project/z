<template>
  <div :class="[blockAttrs.className, blockAttrs.wrapper.class, `layout-${blockAttrs.layout}`]">
    <label :for="blockAttrs.name">{{ blockAttrs.label }}</label>
    <date-time-picker
      :id="blockAttrs.name"
      :required="Boolean(blockAttrs.required)"
      :value="format(formData()[blockAttrs.name])"
      :pickTime="true"
      :format="'YYYY-MM-DD HH:mm'"
      @input="(value) => updateData(parse(value), blockAttrs.name)"
    />
  </div>
</template>

<script>
import DateTimePicker from '~/modules/form/DateTimePicker';

export default {
  inject: ['formData', 'updateData'],
  components: {
    DateTimePicker,
  },
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    parse(date) {
      return Date.parse(date) / 1000;
    },
    format(timestamp) {
      if (!timestamp) return '';

      const date = new Date(timestamp * 1000);
      const year = date.getFullYear();
      const hours = date.getHours();
      let minutes = date.getMinutes();
      let month = '' + (date.getMonth() + 1);
      let day = '' + date.getDate();

      if (month.length < 2) {
        month = '0' + month;
      }

      if (day.length < 2) {
        day = '0' + day;
      }

      if (minutes < 10) {
        minutes = '0' + minutes;
      }

      return `${year}-${month}-${day} ${hours}:${minutes}`;
    },
  },
};
</script>
