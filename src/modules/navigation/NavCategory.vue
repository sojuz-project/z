<template>
  <li>
    <nuxt-link :to="`/products/filter/${blockAttrs.slug}`">{{ blockAttrs.name }}</nuxt-link>
  </li>
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
