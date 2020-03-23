<template>
  <div>
    <client-only>
      <FullCalendarClient :events="entries || []" @datesRender="datesChanged" />
    </client-only>
  </div>
</template>

<script>
let components = {};

if (process.client) {
  components.FullCalendarClient = require('./FullCalendarClient').default;
}

export default {
  components,
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
    innerBlocks: {
      type: Array,
      default: () => [],
    },
    innerHtml: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      activity_from: null,
      activity_to: null,
    };
  },
  methods: {
    getEvents(entries = []) {
      return entries.map(({ post_name, post_meta: { activity_start, activity_end } }) => ({
        title: post_name,
        start: new Date(Number(activity_start) * 1000),
        end: new Date(Number(activity_end) * 1000),
      }));
    },
    datesChanged({ view }) {
      this.activity_from = new Date(view.activeStart).getTime();
      this.activity_to = new Date(view.activeEnd).getTime();
    },
  },
  apollo: {
    entries: {
      query: require('./entries.gql'),
      skip() {
        return !this.activity_from && !this.activity_to;
      },
      variables() {
        const { data } = this.$loginHelpers.getUserInfo() || {};
        const cap = data && Number(data.user.id);

        const filters =
          this.activity_from &&
          this.activity_to &&
          `activity_from=${this.activity_from}&activity_to=${this.activity_to}`;

        return {
          ...(cap && { cap }),
          ...(filters && { filters }),
        };
      },
      update({ entries = [] }) {
        return this.getEvents(entries || []);
      },
    },
  },
};
</script>
