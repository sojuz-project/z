<template>
  <div v-if="conditionalShow" :class="[blockAttrs.className, blockAttrs.wrapper.class]">
    <label v-if="blockAttrs.form.labels" :for="blockAttrs.name">
      {{ blockAttrs.label }}
    </label>
    <input
      :placeholder="blockAttrs.placeholder"
      :id="blockAttrs.name"
      :name="blockAttrs.name"
      :required="Boolean(blockAttrs.required)"
      :value="formData()[blockAttrs.name]"
      @input="(e) => updateData(e.target.checked, blockAttrs.name)"
      class="tgl tgl-light"
      type="checkbox"
    />
    <label :for="blockAttrs.name" class="tgl-btn"><span></span></label>
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
