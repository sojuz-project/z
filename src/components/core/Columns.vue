<template functional>
  <div
    :class="[
      data.class,
      props.blockAttrs.className,
      `has-${props.blockAttrs.backgroundColor || 'default'}-background-color`,
      ,
      `align-${props.blockAttrs.align || 'default'}`,
    ]"
  >
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
  },
};
</script>

<style src="~/css/core/core-columns.css"></style>
