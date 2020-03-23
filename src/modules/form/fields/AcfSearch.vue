<template>
  <div v-if="conditionalShow" :class="[blockAttrs.className, blockAttrs.wrapper.class]">
    <label v-if="blockAttrs.form.labels" :for="blockAttrs.name"> Search {{ blockAttrs.label }} </label>
    <!-- <pre>{{ blockAttrs }}</pre> -->
    <!-- <input
      :type="blockAttrs.type || 'text'"
      :id="blockAttrs.name"
      :value="formData()[blockAttrs.name]"
      @input="(e) => updateData(e.target.value, blockAttrs.name)"
    /> -->
    <Search
      :id="blockAttrs.name"
      :placeholder="blockAttrs.placeholder"
      :required="Boolean(blockAttrs.required)"
      :value="formData()[blockAttrs.name]"
      @input="(e) => updateData(e.target.value, blockAttrs.name)"
      @suggestion-click="(value) => updateData(value, blockAttrs.name)"
    />
  </div>
</template>

<script>
import Search from '~/modules/search/Search.vue';

export default {
  inject: ['formData', 'updateData', 'getConditional'],
  components: { Search },
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
