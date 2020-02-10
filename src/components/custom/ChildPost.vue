<template>
  <!-- <section v-if="mainBlocks"> -->
  <div v-if="mainBlocks" :class="[blockAttrs.className, `align-${blockAttrs.align || 'default'}`]">
    <inner-block v-for="block in mainBlocks.blocks" :key="block.blockName" :blocks="block" />
  </div>
  <!-- </section> -->
</template>

<script>
export default {
  apollo: {
    mainBlocks: {
      query: require('~/gql/core/get_es_blocks.gql'),
      variables() {
        return {
          slug: this.$route.params.post_name,
        };
      },
    },
    get_theme_mod: {
      query: require('~/gql/core/get_theme_mod.gql'),
    },
  },
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
<style src="~/css/custom/custom-post.css"></style>
