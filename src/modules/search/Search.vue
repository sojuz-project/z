<template>
  <div>
    <input :value="value" @input="runQuery" :required="required" :placeholder="placeholder" :autofocus="autofocus" />

    <div v-if="suggestions.length > 0" class="suggestions">
      <p v-for="(item, i) in suggestions" @click="(_) => suggestionClick(item.text)" :key="i">
        {{ item.text }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SearchInput',
  props: {
    value: {
      type: String,
      default: null,
    },
    placeholder: {
      type: String,
      default: null,
    },
    required: {
      type: Boolean,
      default: null,
    },
    autofocus: {
      type: Boolean,
      default: null,
    },
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      inputMode: false,
      interval: null,
      // searchText: this.blockAttrs.placecholder ? this.blockAttrs.placecholder : 'Search something',
      // currentText: '',
      // search: '',
      suggestions: [],
    };
  },
  methods: {
    suggestionClick(suggestion) {
      this.$emit('suggestion-click', suggestion);
      this.suggestions = [];
    },
    runQuery(e) {
      this.$emit('input', e);
      this.$apollo
        .query({
          query: require('./suggest.gql'),
          fetchPolicy: 'no-cache',
          variables: { query: e.target.value },
        })
        .then(({ data }) => {
          this.suggestions = data.suggest.post_title[0].options;
        })
        .catch((response) => console.log('apollo reeor', response));
    },
  },
};
</script>
