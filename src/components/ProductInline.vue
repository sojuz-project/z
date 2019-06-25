<template>
  <div class="product">
    <img src="https://via.placeholder.com/300" alt="product image" >
    <!-- <img :src="product.thumbnail.src" alt="product image" > -->

    <h1>{{ product.post_title }}</h1>
    <span>{{ productMetas._sale_price }}</span>

    <input v-model="qty" type="number" min="1" >
  </div>
</template>

<script>
import { mapMetas } from '~/helpers/index.js'

export default {
  name: 'Product',
  props: {
    product: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      qty: 1
    }
  },
  computed: {
    productMetas() {
      return mapMetas(this.product.post_meta)
    }
  },
  methods: {
    addToCart() {
      // eslint-disable-next-line no-console
      console.log('cart')
    }
  }
}
</script>

<style scoped>
.product {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 300px));;
  grid-column-gap: 20px;
}

img {
  width: 100%;
}
</style>
