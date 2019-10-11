<template>
  <div v-swiper:mySwiper="swiperOption" class="swiper">
    <div class="swiper-wrapper">
      <GridSection
        v-for="(section, i) in attrs.template"
        :class="['grid-section', 'swiper-slide']"
        :key="i"
        :section="section"
        :attrs="attrs"
      ></GridSection>
    </div>
  </div>
</template>
<script>
import Vue from 'vue';
import GridSection from '~/components/customBlocks/GridSection';

if (process.browser) {
  const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr');
  Vue.use(VueAwesomeSwiper);
}
export default {
  components: {
    GridSection,
  },
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
