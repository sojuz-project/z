<template>
  <div :class="[attrs.className, `wrap-${attrs.reasignTo}`]" :style="attrs.style">
    <div class="overlay" ></div>
    <div class="text" v-if="attrs.reasignTo" :is="attrs.reasignTo" :attrs="attrs"></div>
  </div>
</template>

<script>
import gql from 'graphql-tag';
export default {
  components: {
    // actions
    Title: () => import('~/components/actions/Title'),
    Link: () => import('~/components/actions/Link'),
    AddToCart: () => import('~/components/ecommerce/AddToCart'),
    Like: () => import('~/components/actions/Like'),
    Bookmark: () => import('~/components/actions/Bookmark'),
    Categories: () => import('~/components/customBlocks/Categories'),
    SingleMeta: () => import('~/components/customBlocks/SingleMeta'),

    // forms
    LoginForm: () => import('~/components/forms/login'),
    // icons
    IcoFolder: () => import('~/components/icons/Folder'),
    IcoLike: () => import('~/components/icons/Like'),
    IcoCart: () => import('~/components/icons/Cart'),
  },
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
<style src="styleBase/custom-blocks/grid-container-wrapper.css"></style>
