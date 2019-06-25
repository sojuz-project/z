<template>
  <div class="header">
    <h1 class="page-title">
      {{ title }}
    </h1>

    <cart-button />
  </div>
</template>

<script>
import CartButton from '~/components/CartButton.vue'

export default {
  name: 'CartPage',
  components: {
    CartButton
  },
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>

<style>
.header {
  margin: 32px 0;
  display: flex;
  justify-content: space-between
}

.page-title {
  font-size: 32px;
}
</style>
