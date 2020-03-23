<template>
  <section
    :class="[
      blockAttrs.align ? `align-${blockAttrs.align}` : '',
      blockAttrs.className,
      blockAttrs.query ? 'has-query' : '',
    ]"
    v-if="blockParser"
  >
    <div
      :class="['mask', blockAttrs.backgroundColor ? `${blockAttrs.backgroundColor}-background-color` : '']" : {opacity: blockAttrs.backgroundOpacity
      }"
    ></div>
  <InnerBlock key="key" v-for="(block, key) in blockParser" : : blocks="block" />
  <pagination v-if="pages > 0" : pages="pages" : per-page="12" />
  </section >
</template >

  <script>
    import gql from 'graphql-tag';
    import Pagination from '~/modules/pagination/Pagination';
const regTemplate = (blocks, data, queryParams) => {
      let template = JSON.stringify(blocks);
  const matches = {};
  (template.match(/\{\{([^\}]*)\}\}/gm) || []).forEach((el) => {
    const replaced = el
      .replace(/\{\{/g, '')
      .replace(/\}\}/g, '')
      .split('.');

    if (!Object.keys(data).includes('post_name')) {
      const {post_name} = queryParams;
      data = {...data, post_name};
    }

    matches[el] = {
      path: replaced,
      value: get(replaced, data),
    };

    template = template
      .split(typeof matches[el].value === 'object' ? `"${el}"` : el)
      .join(typeof matches[el].value === 'object' ? JSON.stringify(matches[el].value) : matches[el].value);
  });
  return JSON.parse(template);
};
const blocksTemplate = (attrs, blockName, innerBlocks) => {
  return [{attrs, blockName, innerBlocks}];
};

const get = (p, o) => p.reduce((xs, x) => (xs && xs[x] ? xs[x] : null), o);
const mapQuery = (query, blockAttrs, innerBlocks, queryParams) => {
  return (Array.isArray(query) ? query : query ? [query] : []).map((block) => {
    return {
      blockName: blockAttrs.componentItemName ? blockAttrs.componentItemName : 'coregroup',
      attrs: {
      align: blockAttrs.align,
        // className: this.blockAttrs.className,
        ...blockAttrs['component-attrs'],
      },
      innerBlocks: regTemplate(innerBlocks, block, queryParams),
    };
  });
};
export default {
      components: {
      Pagination,
  },
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
  data() {
    return {
      pages: 0,
    };
  },
  computed: {
      blockParser() {
      const parentName = this.blockAttrs.componentParentName ? this.blockAttrs.componentParentName : 'coregroup';
      return this.blocks
        ? // IF RETURN BLOSKS FROM GQL
          this.blockAttrs.componentParentName
          ? blocksTemplate(this.blockAttrs['component-attrs'], parentName, this.blocks)
          : this.blocks
        : // ELSE DONT RETURN BLOSKS FROM GQL
        this.blockAttrs['component-attrs'] && this.blockAttrs['component-attrs'].query
        ? mapQuery(this.blockAttrs['component-attrs'].query, this.blockAttrs, this.innerBlocks, this.$route.params)
        : blocksTemplate(this.blockAttrs['component-attrs'], parentName, this.innerBlocks);
    },
  },
  //
  apollo: {
      blocks: {
      refetchQueries: [{query: require('~/modules/pagination/pagination.gql') }],
      variables() {
      let result = {};
        const filters =
          this.$route.name === 'search'
            ? (this.$route.fullPath.split('?')[1] || '')
                .replace(/(?:\/|\%2F)$/, '')
                .replace(/([,=])[^%]*(?:\%7C|\|)/g, '$1')
            : this.blockAttrs['component-attrs'] && this.blockAttrs['component-attrs'].filter
            ? regTemplate(this.blockAttrs['component-attrs'].filter, {}, this.$route.params)
            : '';

        return this.blockAttrs.queryVariables
          ? {
      ...this.$route.params,
              ...(filters.length > 0 && {filters}),
              limit: this.blockAttrs.itemsLimit ? parseInt(this.blockAttrs.itemsLimit) : 12, // hardcoded TODO
              skip: this.$route.query.page ? parseInt(this.$route.query.page) : 0,
            }
          : {};
      },
      skip() {
        return !this.blockAttrs.query;
      },
      update(data) {
      console.log('test', data, this.blockAttrs);
        this.pages = data.count || 0;
        const query = this.blockAttrs.queryAlias ? data[this.blockAttrs.queryAlias] : data['nq'];
        return mapQuery(
          this.blockAttrs.resTarget ? get(this.blockAttrs.resTarget.split('.'), query) : query,
          this.blockAttrs,
          this.innerBlocks,
          this.$route.params
        );
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
