<template>
  <no-ssr>
    <div v-swiper:mySwiper="swiperOption" :class="['block', 'swiper']">
      <div class="swiper-wrapper">
        <slot></slot>
      </div>
      <div class="swiper-button-prev">< prev</div>
      <div class="swiper-button-next">next ></div>
    </div>
  </no-ssr>
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
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
    innerBlocks: {
      type: Array,
      default: () => [],
    },
    innerHtml: {
      type: String,
      default: '',
    },
  },
  data: function() {
    return {
      swiperOption: {
        loop: false,

        // width: 800,
        // loopedSlides: this.attrs.sectionColumns,
        slidesPerView: parseInt(this.blockAttrs && this.blockAttrs.sectionColumns) || 1,
        centeredSlides: false,
        spaceBetween: parseInt(this.blockAttrs && this.blockAttrs.spaceBetween) || 0,
        updateOnWindowResize: true,
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true,
        },
        allowSlideNext: true,
        // loop: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
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
  min-width: 100%;
  width: 100%;
  margin: 0 auto;
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
