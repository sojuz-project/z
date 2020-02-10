<template functional>
  <div
    :class="props.blockAttrs.className"
    :style="props.blockAttrs.height ? `height:${props.blockAttrs.height}px` : 'height:15px'"
  ></div>
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
