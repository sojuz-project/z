<template>
  <section :is="sectionIs" :blockAttrs="sectionIs === 'section' ? '' : blockAttrs" :class="[blockAttrs.className, blockAttrs.align ? `align-${blockAttrs.align}` : '']">
   <inner-block v-for="block in blocks" :key="block.id" :blocks="block" /> 
  </section>
</template>

<script>
import gql from 'graphql-tag';

export default {
  components: {
   NavDropdown: () => import('~/modules/navigation/NavDropdown'),
  },
  props: {
    /** this.blockAttrs.showBg if true render progresive background colour */
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    sectionIs() {
      return this.blockAttrs.tagName || 'section';
    },
  },
  apollo: {
    blocks: {
      refetchQueries: [{ query: require('~/modules/pagination/pagination.gql') }],
      variables() {
        let result = {};
        const isPaginated = ['template', 'query_paginate', 'query_filter', 'query_filter_paginate'].includes(
          this.$route.name
        );

        return this.blockAttrs.queryVariables && isPaginated
          ? {
              ...this.$route.params,
              page: this.$route.params.page ? parseInt(this.$route.params.page) : 0,
            }
          : {};
      },
      update(data) {
        
        const query = this.blockAttrs.queryAlias ? data[this.blockAttrs.queryAlias] : data['nq'];
        const res = Array.isArray(query) ? query : query ? [query] : [];
        const template = this.blockAttrs.template ? JSON.parse(this.blockAttrs.template) : {};
        return res.map((blockAttrs) => ({ blockAttrs: {...blockAttrs, template:template }, blockName: this.blockAttrs.component }));
      },
      query() {
        return gql`
          ${this.blockAttrs.query}
        `;
      },
    },
  },
};
</script>
