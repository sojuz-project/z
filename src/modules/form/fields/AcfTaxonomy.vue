<template>
  <div :class="[blockAttrs.className, blockAttrs.wrapper.class, 'acfselect']">
    <label v-if="blockAttrs.form.labels" :for="blockAttrs.name">
      {{ blockAttrs.label }}
    </label>
    <select
      :id="blockAttrs.name"
      :required="Boolean(blockAttrs.required)"
      :value="value"
      :multiple="Boolean(blockAttrs.multiple)"
      @input="(e) => updateData(e.target.value, 'term', blockAttrs.name)"
    >
      <option value="">Select taxonomy</option>
      <option v-for="option in categories" :value="option.slug">{{ option.name }}</option>
      <!-- :selected="blockAttrs.default_value.includes(option[0])" -->
    </select>
  </div>
</template>

<script>
export default {
  inject: ['formData', 'updateData'],
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    value() {
      return this.formData()['term'] && this.formData()['term'][this.blockAttrs.name];
    },
  },
  apollo: {
    categories: {
      query: require('./../categories.gql'),
    },
  },
};
</script>
