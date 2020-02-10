<template>
  <div>
    <h2>My wishlist</h2>
    <ul class="nav-v-list pad-L-v-nav nav-bd-top inner-border">
      <li v-for="(item, i) in items" :key="i">
        <nuxt-link :to="`/product/${item.post_name}`">{{ item.post_title }}</nuxt-link>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  components: {},
  computed: {
    items() {
      return this.bookmarks && this.bookmarks.filter(Boolean);
    },
  },
  apollo: {
    bookmarks: {
      query: require('./bookmarks.gql'),
      // fetchPolicy: 'network-only',
    },
  },
};
</script>
