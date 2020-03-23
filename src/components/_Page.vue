<template>
  <div>
    <main v-if="mainBlocks">
      <inner-block v-for="block in mainBlocks.blocks" :key="block.blockName" :blocks="block" />
    </main>
    <router-view />
  </div>
</template>

<script>
const { SOJUZ_PROJECT } = require('/project/projects_archive/nuxt.project.js');
const { layout } = require(`/project/projects_archive/${SOJUZ_PROJECT}/nuxt.layout.js`);
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
