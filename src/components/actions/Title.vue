<template>
  <nuxt-link :class="attrs.className" :to="`/product/${attrs.data.post_name}`">
    {{ attrs.data.post_title }}
  </nuxt-link>
</template>
<script>
export default {
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
