<template>
  <div :class="blockAttrs.className">
    <label class="has-ultrasmall-font-size">
      {{ blockAttrs.label }}
    </label>
    <input
      :type="blockAttrs.type ? blockAttrs.type : 'text'"
      :value="formData()[blockAttrs.name || blockAttrs.fieldName]"
      :placeholder="blockAttrs.placeholder || blockAttrs.label"
      :required="this.blockAttrs.required"
      @input="(e) => updateData(e.target.value, blockAttrs.name || blockAttrs.fieldName)"
      class="has-ultrasmall-font-size"
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
