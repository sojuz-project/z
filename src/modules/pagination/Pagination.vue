<template>
  <ul class="pagination">
    <li v-for="page in count" :key="page">
      <nuxt-link :to="{ query: { ...$route.query, page: getPage(page) } }" no-prefetch>
        {{ page }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    pages: {
      type: Number,
      default: 1,
    },
    perPage: {
      type: Number,
      default: 12,
    },
  },
  computed: {
    count() {
      return Math.ceil(this.pages / this.perPage);
    },
  },
  methods: {
    getPage(page) {
      return (page - 1) * this.perPage;
    },
  },
};
</script>

<style>
.pagination {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.pagination li {
  list-style: none;
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
