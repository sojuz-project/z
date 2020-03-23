<template>
  <div :class="[blockAttrs.className, blockAttrs.wrapper.class, `layout-${blockAttrs.layout}`]">
    <slot />
  </div>
</template>

<script>
export default {
  inject: ['formData', 'updateData'],
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
<style scoped>
.sojuzacfgroup.layout-row {
  display: flex;
}
.sojuzacfgroup.layout-row > * {
  flex: 1;
  padding-left: 10px;
}
.sojuzacfgroup.layout-row > .block:first-child {
  padding-left: 0;
}
</style>
