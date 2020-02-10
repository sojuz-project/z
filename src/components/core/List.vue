<template functional>
  <div :class="[data.class, props.blockAttrs.className]" v-html="props.innerHtml" />
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
<style src="~/css/core/core-list.css"></style>
