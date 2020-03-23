<template functional>
  <!-- classes alignfull has-background-dim has-parallax -->
  <div
    :class="[
      data.class,
      props.blockAttrs.className,
      props.blockAttrs.verticalAlignment ? 'v-align-center' : '',
      !props.blockAttrs.width ? 'columns-defalult' : null,
    ]"
    :style="[
      props.blockAttrs.style,
      props.blockAttrs.width ? { flex: `0 0 calc(${props.blockAttrs.width}% - 5%` } : null,
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
    // innerHtml: {
    //   type: String,
    //   default: '',
    // },
  },
};
</script>
