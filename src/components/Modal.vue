<template>
  <div id="modal">
    <nuxt-link :to="{ path: $route.path.split('/modal')[0] || '/' }">close</nuxt-link>
    <BlocksTraverse :query-params="{ slug: $route.params.modalSlug }" />
  </div>
</template>
<script>
import BlocksTraverse from '~/components/BlocksTraverse.vue';
export default {
  components: {
    BlocksTraverse,
  },
};
</script>
<style>
#modal {
  position: fixed;
  width: 60%;
  height: 60%;
  top: 15%;
  left: 20%;
  background: #fff;
  overflow-y: scroll;
  box-shadow: 0 0 50px #666;
  z-index: 200;
  padding: 3vw;
}
</style>
