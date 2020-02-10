<template>
  <iframe
    id="ytplayer"
    type="text/html"
    :class="[blockAttrs.className]"
    width="100%"
    height="360"
    src="http://www.youtube.com/embed/M7lc1UVf-VE?autoplay=1&origin=http://example.com"
    frameborder="0"
  />
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
      default: () => '',
    },
  },
};
</script>
<style src="~/css/core/core-pullquote.css"></style>
