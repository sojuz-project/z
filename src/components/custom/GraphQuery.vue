<template>
  <section
    v-if="blockParser"
    :class="[
      blockAttrs.align ? `align-${blockAttrs.align}` : '',
      blockAttrs.className,
      blockAttrs.query ? 'has-query' : '',
    ]"
  >
    <InnerBlock v-for="(block, key) in blockParser" :key="key" :blocks="block" />
  </section>
</template>

<script>
import gql from 'graphql-tag';
import { parseFilters, renderParentBlock, renderBlocksFromGqlRes, parseNativeFilters, get } from '~/helpers/graphQuery';

export default {
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
    innerBlocks: {
      type: Array,
      default: () => [],
    },
    innerHtml: {
      type: String,
      default: '',
    },
  },
  computed: {
    blockParser() {
      const res = this.gqlRes;

      return this.blockAttrs.componentParentName
        ? renderParentBlock(this.blockAttrs, this.gqlRes)
        : this.gqlRes || renderParentBlock(this.blockAttrs, null);
    },
  },
  apollo: {
    gqlRes: {
      variables() {
        return {
          ...this.$route.params,
          filters: parseFilters(this.$route, this.blockAttrs),
        };
      },
      skip() {
        return !this.blockAttrs.query;
      },
      query() {
        return gql`
          ${this.blockAttrs.query}
        `;
      },
      update(data) {
        const gqlRes = this.blockAttrs.queryAlias ? data[this.blockAttrs.queryAlias] : data['nq'];
        const targetedRes = this.blockAttrs.resTarget ? get(this.blockAttrs.resTarget.split('.'), gqlRes) : gqlRes;
        const blocks = renderBlocksFromGqlRes(targetedRes, this.blockAttrs, this.innerBlocks, this.$route);
        return blocks;
      },
    },
  },
};
</script>
<style>
.sojuzgraphquery {
  position: relative;
  z-index: 1;
}
.sojuzgraphquery .mask {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
