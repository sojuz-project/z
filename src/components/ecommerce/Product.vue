<template>
  <li>
    <nuxt-link :to="`products/${product.post_name}`">
      <Thumbnail
        v-if="product.thumbnail"
        class="entry-thumbnail"
        :item="product.thumbnail"
        size="big"
        width="30vw"
      />
      <h3 class="entry-title">
        {{ product.post_title }}
      </h3>
    </nuxt-link>
    <div class="entry-meta">
      <span class="entry-price">{{ product.meta._sale_price }}</span>
      <input
        v-model="qty"
        :disabled="!product.meta._stock"
        type="number"
        min="1"
        :max="product.meta._stock || 1"
        class="entry-qty"
      >
      <div class="entry-call">
        <add-to-cart
          :product="product"
          :qty="parseInt(qty)"
          :on-add="onAdd"
          :error-stock="errorStock"
        />
      </div>
      <span class="entry-stock">in stock: {{ product.meta._stock || 0 }}</span>
    </div>
  </li>
</template>

<script>
import { DEFAULT_IMAGE } from '~/helpers/index.js'
import Thumbnail from '~/components/pagePartials/Thumbnail'
import AddToCart from '~/components/ecommerce/AddToCart'

export default {
  name: 'Product',
  components: {
    Thumbnail,
    AddToCart
  },
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
    errorStock() {
      const stock = this.product.meta._stock || 0
      return parseInt(stock) < parseInt(this.qty)
    },
    productImage() {
      const { thumbnail } = this.product
      return (thumbnail && thumbnail.src) || DEFAULT_IMAGE
    }
  },
  methods: {
    onAdd() {
      this.qty = 1
    }
  }
}
</script>
