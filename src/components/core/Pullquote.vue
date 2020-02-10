<template>
  <div :class="[blockAttrs.className]" v-html="innerHtml">
    {{ innerHtml }}
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
      default: () => '',
    },
  },
};
</script>
<style src="~/css/core/core-pullquote.css"></style>
