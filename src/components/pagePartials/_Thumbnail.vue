<template>
  <img
    v-if="item.subtype !== 'svg+xml' || !item.sizes"
    :class="['entry-thumbnail lazyload', size]"
    :data-srcset="generateSrcset(item.sizes)"
    :data-sizes="width"
    :data-src="item.url"
    :alt="item.alt"
  />
  <img v-else :class="['entry-thumbnail lazyload', size]" :data-src="item.url" :alt="item.alt" />
</template>

<script>
export default {
  name: 'Thumbnail',
  props: {
    item: {
      type: Object,
      default: () => ({}),
    },
    width: {
      type: String,
      default: '100vw',
    },
    size: {
      type: String,
      default: 'standard',
    },
  },
  methods: {
    generateSrcset: function(items) {
      const srcSet = [];
      for (const item in items) {
        srcSet.push(`${items[item].url} ${items[item].width}w`);
      }
      return srcSet.join(', ');
    },
    // generateSizes: function (items) {
    //   const sizes = []
    //   for (const item in items) {
    //     sizes.push(`(max-width: ${items[item].width}px) ${this.width}`)
    //   }
    //   return sizes.join(', ')
    // }
  },
};
</script>
