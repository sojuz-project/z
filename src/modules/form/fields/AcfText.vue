<template>
  <div :class="blockAttrs.className">
    <label :for="blockAttrs.name">
      {{ blockAttrs.label }}
    </label>

    <input
      :type="blockAttrs.type || 'text'"
      :placeholder="blockAttrs.placeholder"
      :id="blockAttrs.name"
      :required="Boolean(blockAttrs.required)"
      :value="formData()[blockAttrs.name]"
      @input="(e) => updateData(e.target.value, blockAttrs.name)"
    />
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
