<template>
  <transition appear name="fade">
    <div id="modal">
      <ToastMessage />
      <div v-if="modalBlocks" class="modal-content">
        
        <!-- <component :is="$route.params.modalSlug"></component> -->
        <inner-block v-for="(block, i) in modalBlocks.blocks" :key="i" :blocks="block" />
        <nuxt-link :to="{ path: $route.path.split('/modal')[0] || '/' }" class="close"><Icon
          :blockAttrs="{
            name: 'close',
            size: 40,
            stroke: isBookmarked ? '#fff' : '#000',
            strokeWeight: 1,
            fill: isBookmarked ? '#5ea52f' : '#fff',
            shapeRendering: 'crispEdges',
          }"
        /></nuxt-link>
      </div>
    </div>
  </transition>
</template>
<script>
import ToastMessage from '~/modules/toast/ToastMessage.vue';
export default {
  components: {
    ToastMessage,
    Icon: () => import('~/components/icons/Icon'),
  },
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
  right: 10px;
  top: 10px;
}
.modal-content {
  box-sizing: unset;
  backface-visibility: hidden;
  -webkit-font-smoothing: subpixel-antialiased;
  -webkit-font-smoothing: antialiased;
  background-color: #fff;
  width: 768px;
  max-height: calc(100vh - 100px);
  margin: auto;
  transform: translate3d(0, 40px, 0);
  padding: 30px 20px 40px;
  overflow-y: scroll;
}

@media only screen and (max-width: 768px) {
  .modal-content {
    min-width: 90vw;
    min-height: 90vh;
    max-width: 90vw;
    max-height: 90vh;
    top: 5vh;
    transform: translate3d(0, 0, 0);
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
