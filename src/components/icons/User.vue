<template>
  <svg
    id="i-user"
    :stroke-width="`${attrs.weight / 300}`"
    :fill="attrs.fill"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 32 32"
    width="32"
    height="32"
    stroke="currentcolor"
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    <path
      d="M22 11 C22 16 19 20 16 20 13 20 10 16 10 11 10 6 12 3 16 3 20 3 22 6 22 11 Z M4 30 L28 30 C28 21 22 20 16 20 10 20 4 21 4 30 Z"
    />
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
