<template>
  <ApolloMutation
    :mutation="require('./bookmark.gql')"
    :variables="{
      id: blockAttrs.id,
    }"
    :update="updateCache"
    @done="onDone"
    @error="onError"
  >
    <template v-slot="{ mutate, loading }">
      <div
        :class="['inner-wrapper', blockAttrs.className, isBookmarked ? 'active' : '']"
        @click="() => !loading && mutate()"
      >
        <Icon
          :blockAttrs="{
            name: 'folder',
            size: 20,
            stroke: isBookmarked ? '#fff' : '#000',
            strokeWeight: 1,
            fill: isBookmarked ? '#5ea52f' : '#fff',
            shapeRendering: 'crispEdges',
          }"
        />
      </div>
    </template>
  </ApolloMutation>
</template>
<script>
export default {
  components: {
    Icon: () => import('~/components/icons/Icon'),
  },
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  apollo: {
    isLogged: {
      query: require('~/modules/login/isLogged.gql'),
    },
    isBookmarked: {
      query: require('./bookmarks.gql'),
      update({ bookmarks = [] }) {
        return bookmarks.filter(Boolean).some(({ id }) => id === this.blockAttrs.id);
      },
      skip() {
        return !this.isLogged || !this.blockAttrs.id;
      },
    },
  },
  methods: {
    onDone({ data }) {
      this.$updateToast({ msg: 'Success!', type: 'success' });
    },
    onError(data) {
      this.$updateToast({ msg: data.message, type: 'error' });
    },
    updateCache(store, { data: { bookmark } }) {
      const query = { query: require('./bookmarks.gql') };
      const data = store.readQuery(query);

      if (bookmark) {
        // bookmarked
        const { id, post_name, post_title } = this.blockAttrs;
        data.bookmarks.push({ id, post_name, post_title, __typename: 'Post' });
      } else {
        data.bookmarks = data.bookmarks.filter((item) => item && item.id !== this.blockAttrs.id);
      }

      store.writeQuery({
        ...query,
        data,
      });
    },
  },
};
</script>
<style scoped>
.Bookmark .active {
  background-color: #5ea52f;
}
</style>
