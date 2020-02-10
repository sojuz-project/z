<template functional>
  <div class="block-cell" v-html="block.innerHTML">
    {{ block.innerHTML }}
  </div>
</template>

<script>
export default {
  props: {
    block: {
      type: Object,
      default: () => ({}),
    },
    iteration: {
      type: Number,
      default: 0,
    },
  },
};
</script>
