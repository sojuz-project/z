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
    // eslint-disable-next-line vue/return-in-computed-property
    path() {
      if (this.attrs.data.type == 'product_cat') {
        return {
          name: 'category',
          params: { slug: 'products', catSlug: this.attrs.data.slug },
        };
      }
      if (this.attrs.data.post_type == 'product') {
        return {
          name: 'post',
          params: { slug: 'product', postSlug: this.attrs.data.post_name },
        };
      }
      return {};
      // console.log(this.attrs.data.__typename, to);
      // return Boolean(postType)
      //   ? `/${postType}/${this.attrs.data.post_name}`
      //   : { name: 'category', params: { ...this.$router.params, slug: 'products' } };
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
