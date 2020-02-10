<template functional>
  <div :class="props.blockAttrs.className" v-html="innerHtml"></div>
</template>

<script>
export default {
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
    innerHtml: {
      type: String,
      default: '',
    },
  },
};
</script>
<style src="~/css/core/core-table.css"></style>
