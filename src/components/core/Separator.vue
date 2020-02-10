<template>
  <!-- classes alignfull has-background-dim has-parallax -->
  <hr :class="[blockAttrs.className ? blockAttrs.className : '']" />
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
      default: () => '',
    },
  },
};
</script>
<style src="~/css/core/core-separator.css"></style>
