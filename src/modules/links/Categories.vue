<template>
  <ul class="posts-cat">
    <li v-for="item in attrs.data.categories">
      <nuxt-link :to="{ name: 'category', params: { ...$router.params, catSlug: item.slug } }">
        {{ item.name }}
      </nuxt-link>
    </li>
  </ul>
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

<style scoped>
a {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
