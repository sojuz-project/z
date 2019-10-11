<template>
    <ApolloMutation
      :mutation="require('~/gql/bookmark.gql')"
      :variables="{
       id: attrs.data.id
      }"
      @done="onDone"
      @error="onError"
    >
    <template v-slot="{ mutate, loading }">
      <div  @click="() => !loading && mutate()">
        <IcoFolder :attrs="attrs" />
      </div>
    </template>
    </ApolloMutation>
</template>
<script>
export default {
  components: {
    IcoFolder: () => import('~/components/icons/Folder'),
  },
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    onDone(data){
      this.updateMessage({ msg: 'Success!', type: 'success' });
    },
    onError(data){
      this.updateMessage({ msg: data.message, type: 'error' });
    }
  },
}
</script>
