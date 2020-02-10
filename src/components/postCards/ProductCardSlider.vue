<template>
  <div :class="[blockAttrs.className]" :style="blockAttrs.style">
    <!-- <nuxt-link :to="`blocks-page-1/${blockAttrs.post_name}`"> -->
    <nuxt-link :to="`/product/${blockAttrs.post_name}`">
      <div class="gallery">
        <!-- <ImgStatic :blockAttrs="{...blockAttrs.thumbnail, rsize:'25vw', showBg: true}"/> -->
        <ResponsiveImg :blockAttrs="{ ...blockAttrs.thumbnail, rsize: '25vw', showBg: true }" />

        <GallerySlider :blockAttrs="{ gallery: blockAttrs.post_meta && blockAttrs.post_meta._product_image_gallery }" />
      </div>
      <h5>{{ blockAttrs.post_title }}</h5>
    </nuxt-link>
    <div class="flex">
      <div>{{ blockAttrs.categories.name }}</div>
      <div>$ {{ blockAttrs.post_meta._price }}</div>
    </div>
    <inner-block
      :blocks="{
        className: '',
        blockName: 'Sale',
        attrs: {
          metas: blockAttrs.post_meta,
        },
      }"
    />
  </div>
</template>
<script>
export default {
  components: {
    // ImgStatic: () => import('~/modules/images/ImgStatic'),
    ResponsiveImg: () => import('~/modules/images/ResponsiveImg'),
    GallerySlider: () => import('~/modules/images/GallerySlider'),
  },
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
<style>
.ProductCardSlider {
  position: relative;
}
.gallery {
  position: relative;
  overflow: hidden;
}
.gallery > figure {
  height: 200px;
  max-height: 200px;
}
.gallery > .slider figure img,
.gallery > figure img {
  object-fit: cover;
  min-height: 100%;
  max-height: 100%;
  width: 100%;
}
.gallery > .slider {
  height: 200px;
  position: absolute;
  width: 100%;
  top: 0;
  left: 0;
}
</style>
