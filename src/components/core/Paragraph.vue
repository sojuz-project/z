<template>
  <div :class="attrs.className" :style="attrs.style">
    <div class="overlay"></div>
    <div v-html="innerHtml" class="text">{{ innerHtml }}</div>
  </div>
</template>

<script>
export default {
  props: {
    attrs: {
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
<style src="styleBase/core/core-paragraph.css"></style>
