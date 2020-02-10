<template>
  <div>
    <main v-if="mainBlocks">
      <inner-block v-for="block in mainBlocks.blocks" :key="block.blockName" :blocks="block" />
    </main>
    <router-view />
  </div>
</template>

<script>
import { layout } from 'sojuzProject/nuxt.layout.js';
export default {
  transition: 'smooth',
  layout: layout,
  name: 'Page',
  apollo: {
    mainBlocks: {
      query: require('~/gql/core/get_es_blocks.gql'),
      variables() {
        return {
          slug: this.$route.params.slug || 'home-page',
        };
      },
    },
  },
  head() {
    if (!this.mainBlocks) return {};

    return {
      title: this.mainBlocks.post_title,
    };
  },
};
</script>

<style src="~/css/core/core-page.css"></style>
