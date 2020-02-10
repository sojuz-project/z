<template>
  <ul v-if="query" class="pagination">
    <li v-for="page in query" :key="page">
      <nuxt-link :to="{ name: 'query_paginate', params: { ...$route.params, page: perPage(page) } }" no-prefetch>
        {{ page }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    perPage(page) {
      return page * 12;
    },
  },
  apollo: {
    query: {
      query: require('./pagination.gql'),
      update({ QlPagination }) {
        return Math.floor(QlPagination / 12);
      },
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
