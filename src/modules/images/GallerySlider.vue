<template>
  <div @mouseover="hovered = true" class="slider" @mouseleave="hovered = false">
    <transition name="fade">
      <SliderWrapper v-show="hovered" class="swiper-gallery">
        <div v-for="(srcset, i) in attachments" :key="i" class="list-outline swiper-slide">
          <figure class="coreimage">
            <img v-if="srcset" :srcset="srcset" :alt="`gallery-${i}`" class="photo" />
          </figure>
        </div>
      </SliderWrapper>
    </transition>
  </div>
</template>

<script>
export default {
  components: {
    SliderWrapper: () => import('../common/SlideWrapper'),
    Gallery: () => import('./Gallery'),
  },
  data() {
    return {
      hovered: false,
    };
  },
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  apollo: {
    attachments: {
      query: require('./thumbnailElasticMulti.gql'),
      variables() {
        return {
          ids: this.blockAttrs.gallery.map(Number),
        };
      },
      skip() {
        return !this.hovered || !this.blockAttrs.gallery || this.blockAttrs.gallery.length === 0;
      },
      update({ search = [] }) {
        return search.map(({ post_meta: { location, _wp_attachment_metadata: { sizes = {} } } }) =>
          Object.values(sizes || {}).map(({ file, width }) => `${location}${file} ${width}w`)
        );
      },
    },
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: all 0.3s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.coreimage {
  height: 100%;
}

.coreimage > .photo {
  width: 100%;
}
</style>
