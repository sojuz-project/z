<template>
  <ul class="pagination">
    <li v-for="item in this.getItems()">
      <nuxt-link :to="{ params: { page: item.page } }">
        {{ item.page }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      total: 200,
      current: 1,
    };
  },
  methods: {
    getItems() {
      const total = this.total,
        current = this.current ? this.current : 1,
        max = 7,
        start = current - Math.floor(max / 2) > 1 ? current - Math.floor(max / 2) : 1;
      let items = [];
      for (let index = start; index < max + start; index++) {
        items.push({ page: index });
      }
      return items;
    },
  },
};
</script>
<style>
.pagination {
  display: flex;
  justify-content: center;
}
.pagination li {
  list-style: none;
  border: 1px solid #3f51b5;
  margin: 0.5em;
}
.pagination li a {
  padding: 1em;
  line-height: 2em;
  text-decoration: none;
}
.pagination li a.nuxt-link-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
