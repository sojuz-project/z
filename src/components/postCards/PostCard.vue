<template>
  <div :class="[blockAttrs.className]" :style="blockAttrs.style">
    <!-- <nuxt-link :to="`blocks-page-1/${blockAttrs.post_name}`"> -->
    <nuxt-link :to="blockAttrs.post_name">
      <ImgStatic :blockAttrs="{...blockAttrs.thumbnail, rsize:'25vw'}"/>
      <h3>{{ blockAttrs.post_title }}</h3>
    </nuxt-link>
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
