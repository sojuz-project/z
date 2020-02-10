<template>
  <!-- classes alignfull has-background-dim has-parallax -->
  <div :class="[blockAttrs.className, classes]" :style="styles">
    >>>[IMAGE LOADING PROBLEM (apollo loading guardian with Image.vue)]
    <OImage :blockAttrs="{id:blockAttrs.mediaId}"/>
    <div><slot /></div>
  </div>
</template>

<script>

export default {
  components: {
    OImage: () => import('~/modules/images/Image'),
  },
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
        // this.blockAttrs.align ? `align-${this.blockAttrs.align}` : 'default',
        // this.blockAttrs.hasParallax ? `hasParallax` : null,
        // this.blockAttrs.overlayColor ? `has-${this.blockAttrs.overlayColor}-background-color` : null,
      ];
    },
    styles() {
      // console.log('dsfdsfds', this.blockAttrs.);
      return {
        // opacity: `${this.blockAttrs.dimRatio ? this.blockAttrs.dimRatio / 100 : initial}`,
      };
    },
  },
};
</script>
<style src="~/css/core/core-mediatext.css"></style>
