<template>
  <!-- classes alignfull has-background-dim has-parallax -->
  <div :class="[blockAttrs.className, classes]" :style="styles">
    <div
      :style="[
        blockAttrs.dimRatio ? { opacity: blockAttrs.dimRatio / 100 } : { opacity: 0 },
        blockAttrs.customOverlayColor ? { backgroundColor: blockAttrs.customOverlayColor } : null,
      ]"
      :class="['overlay', blockAttrs.overlayColor ? `has-${blockAttrs.overlayColor}-background-color` : null]"
    />
    <slot />
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
    classes() {
      return [
        this.blockAttrs.align ? `align-${this.blockAttrs.align}` : 'default',
        this.blockAttrs.hasParallax ? `hasParallax` : null,
        this.blockAttrs.focalPoint ? 'focal-active' : '',
      ];
    },
    styles() {
      return {
        // opacity: `${this.blockAttrs.dimRatio ? this.blockAttrs.dimRatio / 100 : initial}`,
        backgroundImage: `url(${this.blockAttrs.url})`,
        backgroundPosition: this.blockAttrs.focalPoint
          ? `${this.blockAttrs.focalPoint.x * 100}% ${this.blockAttrs.focalPoint.y * 100}%`
          : '',
      };
    },
  },
};
</script>
<style src="~/css/core/core-cover.css"></style>
