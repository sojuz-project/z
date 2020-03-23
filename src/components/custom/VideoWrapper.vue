<template>
  <section :class="[blockAttrs.align ? `align-${blockAttrs.align}` : '', blockAttrs.className]">
    <video autoplay muted loop>
      <source :src="blockAttrs.videoSrc" type="video/mp4" />
    </video>
    <div
      :style="{ opacity: blockAttrs.backgroundOpacity }"
      :class="['mask', blockAttrs.backgroundColor ? `${blockAttrs.backgroundColor}-background-color` : '']"
    ></div>
    <slot></slot>
  </section>
</template>

<script>
import gql from 'graphql-tag';
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
  apollo: {},
};
</script>
<style>
.sojuzvideowrapper {
  position: relative;
  z-index: 1;
  overflow: hidden;
}
.sojuzvideowrapper .mask {
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: -1;
}

.sojuzvideowrapper video {
  position: absolute;
  left: 50%; /* % of surrounding element */
  top: 50%;
  transform: translate(-50%, -50%); /* % of current element */
  z-index: -1;
  top: -50%;
}
</style>
