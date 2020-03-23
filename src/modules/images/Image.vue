<template>
  <figure :class="[blockAttrs.className, classes]" :style="color">
    <!-- <div v-if="!$apolloData.loading || !attachments" v-html="innerHtml" /> -->
    aaa
    <img
      v-if="srcset.length"
      :data-srcset="srcset"
      :alt="blockAttrs.alt || blockAttrs.title"
      sizes="100vw"
      class="photo lazyload"
    />
    <img :width="`${blockAttrs.width}px`" :height="`${blockAttrs.height}px`" v-if="!srcset.length" :src="this.url" />
  </figure>
</template>

<script>
export default {
  props: {
    /** this.blockAttrs.showBg if true render progresive background colour */
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
    innerHtml: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      color: '#fff',
      srcset: [],
      url: '',
    };
  },
  computed: {
    classes() {
      return [
        this.blockAttrs.align ? `align-${this.blockAttrs.align}` : 'align-default',
        !this.blockAttrs.width || !this.blockAttrs.height ? 'default' : 'custom',
      ];
    },
  },
  methods: {
    genSrcset(sizes = []) {
      this.srcset = sizes.map(({ url, width }) => `${url} ${width}w`);
    },
  },
  apollo: {
    attachments: {
      query: require('./thumbnail.gql'),
      skip() {
        return this.blockAttrs.id === null;
      },
      variables() {
        return { ids: [this.blockAttrs.id] };
      },
      update({ attachments = [] }) {
        this.url = (attachments[0] || {}).url || '';
        const firstAttachment = attachments[0] || {};
        this.color = this.blockAttrs.showBg
          ? `background-color:${firstAttachment.colors.pop()}; min-height: 14vw;`
          : '';
        this.genSrcset(firstAttachment.sizes);
      },
    },
  },
};
</script>
<style src="~/css/core/core-image.css"></style>
