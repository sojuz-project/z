<template>
  <!-- classes alignfull has-background-dim has-parallax -->
  <div
    :style="{backgroundImage: `url(${attrs.url})`}"
  >
    <div class="mask"/>
    <slot/>
  </div>
</template>

<script>
export default {
  props: {
    attrs: {
      type: Object,
      default: () => ({})
    },
    innerHtml: {
      type: String,
      default: () => ('')
    }
  }
}
</script>
<style src="styleBase/core/core-cover.css"></style>
