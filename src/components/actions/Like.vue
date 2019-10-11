<template>
    <ApolloMutation
      :mutation="require('~/gql/like.gql')"
      :variables="{
        id: attrs.data.id
      }"
      @done="onDone"
      @error="onError"
    >
      <template v-slot="{ mutate, loading }">
        <div  @click="() => !loading && mutate()">
          <IcoLike :attrs="attrs" />
          <span>&nbsp;</span>
          <p>{{likes}}</p>
        </div>
      </template>
    </ApolloMutation>
</template>
<script>
export default {
  components: {
    IcoLike: () => import('~/components/icons/Like'),
  },
  data() {
    return {
      likes: this.attrs.data.likes
    };
  },
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    onError(data){
      this.updateMessage({ msg: data.message, type: 'error' });
    },
    onDone({ data: { like } }) {
      this.likes = like > 0 ? this.likes+1 : this.likes-1
    }
  },
}
</script>
<style>
.wrap-Like{
  cursor:pointer;
}
.wrap-Like:hover{
  filter: brightness(0.9);
}
.wrap-Like > div > div {
  display: flex;
  align-items: center;
}
</style>
