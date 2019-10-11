<template>
  <svg
    id="i-heart"
    :stroke-width="`${attrs.weight / 300}`"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    fill="none"
    stroke="currentcolor"
    stroke-linecap="round"
    stroke-linejoin="round"
    shape-rendering="geometricPrecision"
  >
    <path d="M4 16 C1 12 2 6 7 4 12 2 15 6 16 8 17 6 21 2 26 4 31 6 31 12 28 16 25 20 16 28 16 28 16 28 7 20 4 16 Z" />
  </svg>
</template>
<script>
/* https://raw.githubusercontent.com/danklammer/bytesize-icons/master/dist/icons/heart.svg */
export default {
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
