<template functional>
  <div :class="[data.class, props.blockAttrs.className]" :style="props.blockAttrs.style">
    <span v-if="props.blockAttrs.tagName" :is="props.blockAttrs.tagName" v-html="props.innerHtml" />
    <span v-else v-html="props.innerHtml" />
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
};
</script>
<style src="~/css/core/core-heading.css"></style>
