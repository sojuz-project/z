<template>
  <div :class="[blockAttrs.className]" :style="blockAttrs.style">
    <!-- <nuxt-link :to="`blocks-page-1/${blockAttrs.post_name}`"> -->
    <nuxt-link :to="`/product/${blockAttrs.post_name}`">
      <ImgStatic :blockAttrs="{ ...blockAttrs.thumbnail, rsize: '25vw', showBg: true }" />
      <h5>{{ blockAttrs.post_title }}</h5>
    </nuxt-link>
    <div class="flex">
      <div>{{ blockAttrs.categories.name }}</div>
      <div>$ {{ blockAttrs.post_meta._price }}</div>
    </div>
  </div>
</template>
<script>
export default {
  components: {
    ImgStatic: () => import('~/modules/images/ImgStatic'),
  },
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
