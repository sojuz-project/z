<template>
  <!-- classes alignfull has-background-dim has-parallax -->
  <hr :class="[attrs.className ? attrs.className : '']" />
</template>

<script>
export default {
  props: {
    attrs: {
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
<style src="styleBase/core/core-separator.css"></style>
