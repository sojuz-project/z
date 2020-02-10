<template>
  <div
    :class="[
      'wp-block-button',
      blockAttrs.className,
      blockAttrs.align ? `has-text-align-${blockAttrs.align}` : 'align-default',
    ]"
    :style="blockAttrs.style"
  >
    <a v-if="blockAttrs.hyperLink" :href="blockAttrs.frontUrl" v-html="blockAttrs.frontText" target="_blank"></a>
    <nuxt-link
      v-if="!blockAttrs.hyperLink"
      :class="[
        blockAttrs.textColor ? `has-${blockAttrs.textColor}-color` : 'has-withe-color',
        blockAttrs.backgroundColor
          ? `has-${blockAttrs.backgroundColor}-background-color`
          : 'has-default-background-color',
      ]"
      :to="`${blockAttrs.frontUrl}/`"
      v-html="blockAttrs.frontText"
    ></nuxt-link>
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
