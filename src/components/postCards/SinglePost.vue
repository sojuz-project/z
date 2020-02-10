<template>
  <div :class="[blockAttrs.className]" :style="blockAttrs.style">Single card {{ blockAttrs }}</div>
</template>
<script>
export default {
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
