<template functional>
  <section
    :class="[
      props.blockAttrs.className,
      !props.blockAttrs.wrapperType && props.blockAttrs.className,
      ,
      props.blockAttrs.align ? `align-${props.blockAttrs.align}` : '',
      'wrapper',
    ]"
    :is="props.blockAttrs.tagName || 'section'"
  >
    <slot />
  </section>
</template>

<script>
export default {
  /** if wraper type exist - build query   */
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
<style src="~/css/custom/custom-wrapper.css"></style>
