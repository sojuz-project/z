<template>
  <div v-if="attachments" class="block-cell">
    <img v-if="!attachments.sizes" :class="['lazyload']" :src="attachments.src" />
    <img
      v-else
      :data-srcset="generateSrcset(attachments.sizes)"
      :class="['lazyload']"
      :data-src="attachments.src"
      :src="attachments.src"
    />
  </div>
</template>

<script>
import Attachments from '~/gql/attachments.gql';

export default {
  apollo: {
    attachments: {
      // skip: this || this.attrs,
      query: Attachments,
      variables() {
        return {
          ids: [parseInt(this.imgId)],
        };
      },
      update: (data) => data.attachments[0],
    },
  },
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      imgId: this.attrs.id,
      attachments: {},
    };
  },
  methods: {
    generateSrcset: function(items) {
      const srcSet = [];
      for (const item in items) {
        srcSet.push(`${items[item].url} ${items[item].width}w`);
      }
      return srcSet.join(', ');
    },
  },
};
</script>
<style src="styleBase/core/core-image.css"></style>
