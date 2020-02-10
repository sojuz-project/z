<template>
  <div v-if="attachments && attachments.length" :class="wrapperClass">
    <figure v-for="(srcset, i) in attachments" :key="i" class="blocks-gallery-item">
      <img v-if="srcset" :data-srcset="srcset" :alt="`gallery-${i}`" class="lazyload" />
    </figure>
  </div>
</template>

<script>
export default {
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
    innerHtml: {
      type: String,
      default: '',
    },
  },
  computed: {
    wrapperClass() {
      const { className, columns, align, imageCrop } = this.blockAttrs;
      let css = `${className} `;
      css += columns ? `columns-${columns} ` : '';
      css += align ? `align-${align} ` : '';
      css += imageCrop ? '' : ' is-cropped';
      return css;
    },
  },
  apollo: {
    attachments: {
      query: require('./thumbnailElasticMulti.gql'),
      variables() {
        return {
          ids: this.blockAttrs.ids.map(Number),
        };
      },
      skip() {
        return !this.blockAttrs.ids || this.blockAttrs.ids.length === 0;
      },
      update({ search = [] }) {
        return search.map(({ post_meta: { location, _wp_attachment_metadata: { sizes = {} } } }) =>
          Object.values(sizes || {}).map(({ file, width }) => `${location}${file} ${width}w`)
        );
      },
    },
  },
};
</script>

<style src="~/css/core/core-gallery.css"></style>
