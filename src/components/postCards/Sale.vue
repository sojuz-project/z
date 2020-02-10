<template>
  <div v-if="blockAttrs.metas._sale_price" :class="[blockAttrs.className]" :style="blockAttrs.style">
    SALE
  </div>
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
<style scoped>
.Sale {
  position: absolute;
  background-color: #5db209;
  color: #fff;
  font-weight: bold;
  padding: 3px;
  top: 20px;
  font-size: 12px;
  pointer-events: none;
}
</style>
