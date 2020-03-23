<template>
  <div :class="blockAttrs.className">
    <label v-if="blockAttrs.form.labels" :for="blockAttrs.name">
      {{ blockAttrs.label }}
    </label>

    <select
      :id="blockAttrs.name"
      :required="Boolean(blockAttrs.required)"
      :value="formData()[blockAttrs.name]"
      :multiple="Boolean(blockAttrs.multiple)"
      @input="(e) => updateData(e.target.value, blockAttrs.name)"
    >
      <option v-for="option in Object.entries(blockAttrs.choices)" :value="option[0]">{{ option[1] }}</option>
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
};
</script>
