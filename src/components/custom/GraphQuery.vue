/** depreciated Query.vue and Wrapper.vue */
<template>
  <section>
    <div v-if="blockParser">
      <InnerBlock v-for="(block, key) in blockParser" :key="key" :blocks="block" />
    </div>
  </section>
</template>
<script>
import gql from 'graphql-tag';
const get = (p, o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);

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
      return this.blocks
        ? [
            {
              attrs: this.blockAttrs['component-attrs'],
              blockName: this.blockAttrs.componentParentName ? this.blockAttrs.componentParentName : 'coregroup',
              innerBlocks: this.blocks,
            },
          ]
        : [
            {
              attrs: this.blockAttrs['component-attrs'],
              blockName: this.blockAttrs.componentParentName ? this.blockAttrs.componentParentName : 'coregroup',
            },
          ];
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
      skip() {
        return !this.blockAttrs.query;
      },
      update(data) {
        const query = this.blockAttrs.queryAlias ? data[this.blockAttrs.queryAlias] : data['nq'];

        return (Array.isArray(query) ? query : query ? [query] : []).map((block) => {
          let template = JSON.stringify(this.innerBlocks);
          const matches = {};
          (template.match(/\{\{([^\}]*)\}\}/gm) || []).forEach((el) => {
            console.log(template, template.match(/\{\{([^%]*)\}\}/gm))
            matches[el] = {
              path: el.replace(/\{\{/g, '').replace(/\}\}/g, '').split('.'),
              value: get(el.replace(/\{\{/g, '').replace(/\}\}/g, '').split('.'), block),
            };
            template = template.split(el).join(matches[el].value);
          });

          return {
            blockName: this.blockAttrs.componentItemName ? this.blockAttrs.componentItemName : 'coregroup',
            attrs: block,
            innerBlocks: JSON.parse(template),
          };
        });
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
