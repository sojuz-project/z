<template>
  <svg
    id="i-folder"
    :stroke-width="`${attrs.weight / 300}`"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="32"
    height="32"
    fill="none"
    stroke="currentcolor"
    stroke-linecap="round"
    stroke-linejoin="round"
    shape-rendering="crispEdges"
  >
    <path d="M2 26 L30 26 30 7 14 7 10 4 2 4 Z M30 12 L2 12" />
  </svg>
</template>
<script>
/* https://raw.githubusercontent.com/danklammer/bytesize-icons/master/dist/icons/folder.svg */
export default {
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
