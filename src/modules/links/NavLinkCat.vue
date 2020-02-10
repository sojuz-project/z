<template functional>
  <li :is="props.attrs.tagName || 'li'" :class="props.attrs.className">
    <nuxt-link :to="{ name: 'products-category', params: { catSlug: props.attrs.slug } }">
      {{ props.attrs.name }}
    </nuxt-link>
  </li>
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
