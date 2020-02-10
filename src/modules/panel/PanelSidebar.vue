<template>
<div>
  <BlocksMenu
    :blockAttrs="{
      menuLocation: 'profile-menu',
      className: 'nav-v-list pad-L-h-nav pad-L-v-nav closed nav-bd-top inner-border',
    }"
  />
</div>

</template>

<script>
export default {
  components: {
    BlocksMenu: () => import(/* webpackChunkName: "blocksMenu" */ '~/modules/navigation/BlocksMenu'),
  },
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
