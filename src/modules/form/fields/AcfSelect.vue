<template>
  <div :class="blockAttrs.className">
    <label :for="blockAttrs.name">
      {{ blockAttrs.label }}
    </label>

    <select
      :placeholder="blockAttrs.placeholder"
      :id="blockAttrs.name"
      :required="Boolean(blockAttrs.required)"
      :value="formData()[blockAttrs.name]"
      @input="(e) => updateData(e.target.value, blockAttrs.name)"
    >
      <option v-for="option in Object.entries(blockAttrs.choices)" :value="option[0]">{{ option[1] }}</option>
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
