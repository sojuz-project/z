<template>
  <div
    :class="[
      'block',
      'group',
      blockAttrs.className,
      `align-${blockAttrs.align || 'default'}`,
      `has-${blockAttrs.backgroundColor || 'default'}-background-color`,
    ]"
  >
    <nuxt-link :to="blockAttrs.url" v-if="blockAttrs.url">
      <slot />
    </nuxt-link>
    <slot v-if="!blockAttrs.url" />
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
    className: {
      type: String,
      default: '',
    },
  },
};
</script>
<style src="~/css/core/core-group.css"></style>
