<template>
  <svg
    id="i-close"
    :stroke-width="`${attrs.weight / 300}`"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="32"
    height="32"
    fill="none"
    stroke="currentcolor"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path d="M2 30 L30 2 M30 30 L2 2" />
  </svg>
</template>
<script>
/* https://raw.githubusercontent.com/danklammer/bytesize-icons/master/dist/icons/close.svg */
export default {
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
