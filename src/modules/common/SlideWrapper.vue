<template>
  <div v-swiper:mySwiper="swiperOption" class="swiper">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
  </div>
</template>
<script>
/** add items swipe-slide class */
import Vue from 'vue';
if (process.browser) {
  const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
  Vue.use(VueAwesomeSwiper);
}
export default {
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
  data: function() {
    return {
      swiperOption: {
        loop: false,
        // loopedSlides: this.attrs.sectionColumns,
        slidesPerView: parseInt(this.attrs.sectionColumns) || 1,
        centeredSlides: false,
        spaceBetween: 0,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
        // on: {
        //   slideChange() {
        //     console.log('onSlideChangeEnd', this);
        //   },
        //   tap() {
        //     console.log('onTap', this);
        //   },
        // },
      },
    };
  },
};
</script>
<style>
.swiper {
  position: relative;
  overflow: hidden;
  height: 100%;
}
.swiper-wrapper {
  display: flex;
  width: 100%;
  height: 100%;
  transition: all 0ms ease;
}
.swiper-slide {
  overflow: hidden;
  flex-shrink: 0;
  width: 100%;
  height: 100%;
}
</style>
