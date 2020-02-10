<template>
  <div :is="tagName" v-if="mainBlocks">
    <inner-block v-for="block in mainBlocks.blocks" :key="block.blockName" :blocks="block" />
  </div>
</template>
<script>
export default {
  props: {
    tagName: {
      type: String,
      default: 'div',
    },
    contentSlug: {
      type: String,
      default: '',
    },
  },
  computed: {
    themeMod() {
      return this.get_theme_mod ? this.get_theme_mod : {};
    },
    // checkMenu() {
    //   return this.$isMobile() ? 'main-mobile-menu' : 'main-menu';
    // },
  },
  apollo: {
    get_theme_mod: {
      query: require('~/gql/core/get_theme_mod.gql'),
    },
    mainBlocks: {
      query: require('~/gql/core/get_es_blocks.gql'),
      variables() {
        return {
          slug: this.themeMod[this.contentSlug],
        };
      },
    },
  },
};
</script>
