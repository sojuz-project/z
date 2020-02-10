<template functional>
  <div :class="['block','group',props.blockAttrs.className, `align-${props.blockAttrs.align || 'default'}`, `has-${props.blockAttrs.backgroundColor || 'default'}-background-color`]">
    <slot />
  </div>
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
    className: {
      type: String,
      default: '',
    },
  },
};
</script>
<style src="~/css/core/core-group.css"></style>
