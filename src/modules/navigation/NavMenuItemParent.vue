<template>
  <li :class="blockAttrs.className">
    <ul>
      <li>
        <nuxt-link :to="`${blockAttrs.url}`">{{ blockAttrs.title }}</nuxt-link>
      </li>
      <slot></slot>
    </ul>
  </li>
</template>
<script>
export default {
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
