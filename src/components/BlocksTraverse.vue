<template>
  <div class="site-content">
    <inner-block v-for="(block, i) in blocks" :key="i" :blocks="block" />
  </div>
</template>
<script>
import PostSlug from '~/gql/blocksBySlug.gql';
import gql from 'graphql-tag';
export default {
  components: {},
  props: {
    queryParams: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    blocks() {
      const { blocks = [] } = this.get_page || {};
      return blocks.filter((el) => el.blockName != null);
    },
  },
  apollo: {
    get_page: {
      variables() {
        console.log(this.queryParams);
        return { ...this.queryParams, page: Number(this.queryParams.page) };
      },
      query: PostSlug,
    },
  },
};
</script>
<style src="styleBase/core/core-global.css"></style>
<style src="styleBase/custom-blocks/atomic-grid.css"></style>
