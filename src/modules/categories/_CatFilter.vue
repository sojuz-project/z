<template>
  <dropdown :label="selected">
    <ul class="nav-v-list closed nav-sub pad-L-h-nav pad-L-v-nav">
      <li>
        <nuxt-link :to="{ name: 'slug', params: { slug: 'products' } }">
          All categories
        </nuxt-link>
      </li>
      <li v-for="item in categories">
        <nuxt-link :to="{ name: 'category', params: { ...$router.params, catSlug: item.slug } }">
        {{ item.name }}
      </nuxt-link>
      </li>
    </ul>
  </dropdown>
</template>
<script>
export default {
  components: {
    Dropdown: () => import('~/components/forms/Dropdown'),
  },
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
  computed:{
    selected(){
      const cs = this.$route.params.catSlug;
      return cs ? this.categories.find(x => x.slug === cs).name : "All categories"
    }
  },
  apollo: {
    categories: {
      query: require('./categories.gql'),
    },
  },
};
</script>
