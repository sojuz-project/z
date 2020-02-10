<template>
  <figure
    ref="figure"
    :class="[blockAttrs.className, blockAttrs.align ? `has-text-align-${blockAttrs.align}` : null]"
    :style="color"
  >
    <client-only v-if="srcset && srcset.length">
      <img
        :width="blockAttrs.width ? `${blockAttrs.width}px` : null"
        :height="blockAttrs.height ? `${blockAttrs.height}px` : null"
        :data-srcset="srcset"
        :data-sizes="`${width}px`"
        :alt="blockAttrs.alt || blockAttrs.title"
        class="photo lazyload"
        sizes="100vw"
      />
    </client-only>
  </figure>
</template>

<script>
export default {
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
    lazyload: {
      type: Boolean,
      default: true,
    },
    innerHtml: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      width: null,
      location: '',
      fullLocation: '',
    };
  },
  computed: {
    srcset() {
      return this.width !== null && this.attachments ? this.generateSrcset(this.attachments, this.width) : [];
    },
    color() {
      return {
        backgroundColor: this.blockAttrs.colors && this.blockAttrs.colors[0],
        // minHeight: '12vw',
      };
    },
  },
  mounted() {
    if (this.$refs.figure) {
      this.width = this.$refs.figure.getBoundingClientRect().width;
    }
  },
  apollo: {
    attachments: {
      query: require('./thumbnailElastic.gql'),
      skip() {
        return this.blockAttrs.id === null && !process.client;
      },
      variables() {
        return {
          id:
            this.blockAttrs && this.blockAttrs.imageSourceMap
              ? parseInt(this.blockAttrs.imageSourceMap)
              : this.blockAttrs.id,
        };
      },
      update({ queryPost }) {
        const metas = (queryPost || {}).post_meta || {};
        this.location = metas.location;
        this.fullLocation = metas.fullLocation;
        return Object.values((metas._wp_attachment_metadata || {}).sizes || {}) || [];
      },
    },
  },
  methods: {
    generateSrcset(data = [], imageWidth) {
      return data.length > 0
        ? data
            .filter(({ width }) => Math.abs(width - imageWidth) < 400)
            .map(({ file, width }) => `${this.location}${file} ${width}w`)
        : this.fullLocation;
    },
  },
};
</script>

<style src="~/css/core/core-image.css"></style>
