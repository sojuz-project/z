<template>
  <nuxt-link :class="attrs.className" :to="path" />
</template>
<script>
export default {
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    path() {
      const postType = this.attrs.data.__typename;
      return Boolean(postType)
        ? `/${postType}/${this.attrs.data.post_name}`
        : { name: 'category', params: { slug: 'products', catSlug: this.attrs.data.slug } };
    },
  },
};
</script>

<style scoped>
a {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
