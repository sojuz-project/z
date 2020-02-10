<template>
  <div>
    <h2>Downloads</h2>
    <ul class="nav-v-list nav-bd-top inner-border">
      <li v-for="(item, i) in items" :key="i" class="flex">
        <div>
          <p>{{ item.product_name }}</p>
        </div>
        <div><a :href="item.download_url">download</a></div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      blocks: [],
    };
  },
  computed: {
    items() {
      return this.get_downloads && this.get_downloads.filter(Boolean);
    },
  },
  apollo: {
    get_downloads: {
      query: require('./getDownloads.gql'),
      fetchPolicy: 'network-only',
    },
  },
};
</script>
<style></style>
