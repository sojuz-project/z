<template>
  <div v-if="conditionalShow" :class="[blockAttrs.className, blockAttrs.wrapper.class]">
    <label v-if="blockAttrs.form.labels" :for="blockAttrs.name">
      {{ blockAttrs.label }}
    </label>
    <!-- <pre>{{ blockAttrs }}</pre> -->
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
  inject: ['formData', 'updateData', 'getConditional'],
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    conditionalShow() {
      return (
        !this.blockAttrs.conditional_logic || this.getConditional(this.blockAttrs.conditional_logic, this.formData())
      );
    },
  },
};
</script>
