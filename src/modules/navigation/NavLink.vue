<template>
  <!-- <div class="inner-wrapper"><nuxt-link to="modal/half-products" append>^</nuxt-link></div> -->
  <nuxt-link :to="`${blockAttrs.template ? blockAttrs.template.prepath : ''}${blockAttrs.slug}`">{{blockAttrs.name}}</nuxt-link>
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
