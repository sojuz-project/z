<template>
  <!-- classes alignfull has-background-dim has-parallax -->
  <div :style="attrs.style">
    <slot />
  </div>
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
<style src="styleBase/core/core-columns.css"></style>
