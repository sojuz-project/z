<template>
  <figure :class="['coreimage', blockAttrs.className]" :style="color">
    <img v-if="lazyload" :data-srcset="srcset" :data-sizes="rsize" class="photo lazyload" :alt="blockAttrs.alt || blockAttrs.title" />
    <img v-else :srcset="srcset" :sizes="rsize" class="photo" :alt="blockAttrs.alt || blockAttrs.title" />
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
  },
  computed: {
    srcset() {
      return this.blockAttrs.sizes && this.blockAttrs.sizes.map(({ url, width }) => `${url} ${width}w`);
    },
    rsize() {
      return this.blockAttrs.rsize || '100vw';
    },
    color() {
      return {
        ...this.blockAttrs.style,
        backgroundColor: this.blockAttrs.colors && this.blockAttrs.colors[0],
        minHeight: '12vw',
      };
    },
  },
};
</script>
<style src="~/css/core/core-image.css"></style>
