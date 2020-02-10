<template>
  <ApolloMutation
    :mutation="require('./like.gql')"
    :variables="{
      id: blockAttrs.id,
    }"
    @error="onError"
    :update="updateCache"
  >
    <template v-slot="{ mutate, loading }">
      <div
        :class="['inner-wrapper', blockAttrs.className, post && post.liked ? 'active' : '']"
        @click="() => !loading && mutate()"
      >
        <Icon
          :blockAttrs="{
            name: 'like',
            size: 20,
            strokeWeight: 1.5,
            strokeOpacity: post && post.liked ? 0.1 : 1,
            fill: post && post.liked ? '#FC603D' : '#fff',
          }"
        />
        <span v-if="post && post.likes" class="likes-count">{{ post.likes }}</span>
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
    post: {
      query: require('./postLikes.gql'),
      variables() {
        return {
          id: this.blockAttrs.id,
        };
      },
    },
  },
  methods: {
    onError(data) {
      this.$updateToast({ msg: data.message, type: 'error' });
    },
    updateCache(
      store,
      {
        data: {
          like: { likes, liked },
        },
      }
    ) {
      const query = { query: require('./postLikes.gql'), variables: { id: this.blockAttrs.id } };
      const data = store.readQuery(query);

      store.writeQuery({
        ...query,
        data: {
          post: {
            ...data.post,
            likes,
            liked,
          },
        },
      });
    },
  },
};
</script>
<style>
.inner-wrapper {
  cursor: pointer;
}
.inner-wrapper:hover {
  filter: brightness(0.9);
}
</style>
