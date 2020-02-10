<template>
  <transition appear name="fade">
    <div id="modal">
      <div v-if="modalBlocks" class="modal-content">
        <!-- <component :is="$route.params.modalSlug"></component> -->
        <inner-block v-for="(block, i) in modalBlocks.blocks" :key="i" :blocks="block" />
        <nuxt-link :to="{ path: $route.path.split('/modal')[0] || '/' }" class="close">close</nuxt-link>
      </div>
    </div>
  </transition> 
</template>
<script>
export default {
  // transition: 'smooth',
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
  apollo: {
    modalBlocks: {
      query: require('~/gql/core/get_es_modal_blocks.gql'),
      variables() {
        return {
          slug: this.$route.params.modalSlug,
        };
      },
    },
  },
};
</script>
<style scoped>
#modal {
  position: fixed;
  width: 100%;
  height: 100%;
  z-index: 900;
  background-color: rgba(0, 0, 0, 0.8);
  top: 0;
}
#modal .close {
  position: absolute;
  right: 2vw;
  top: 2vw;
}
.modal-content {
  overflow-y: auto;
  z-index: 500;
  max-height: calc(100% - 60px);
  max-width: calc(100% - 20px);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 4vw;
  min-height: 35vw;
  min-width: 40vw;
}

@media only screen and (max-width: 768px) {
  .modal-content {
    min-height: 90vh;
    min-width: 90vw;
    max-height: 97vh;
    max-width: 97vw;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
