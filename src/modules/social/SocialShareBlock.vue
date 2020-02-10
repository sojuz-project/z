<template>
  <div :class="['xxxx', blockAttrs.className]" :style="blockAttrs.style">
    <social-share network="facebook">
      <button class="wp-block-button is-style-outline">share on facebook</button>
    </social-share>
    <social-share network="twitter">
      <button class="wp-block-button is-style-outline">share on twitter</button>
    </social-share>
  </div>
</template>
<script>
import SocialShare from './SocialShare';
export default {
  components: {
    SocialShare,
  },
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
<style src="~/css/core/core-button.css"></style>
