<template>
  <div class="product">
    <img :src="productImage" alt="product image" >

    <div class="product-content">
      <h2 class="product-title">
        {{ product.post_title }}
      </h2>

      <div>
        <span class="product-price">{{ product.meta._sale_price }}</span>

        <div>
          <input
            v-model="qty"
            :disabled="!product.meta._stock"
            type="number"
            min="1"
            :max="product.meta._stock || 1"
            class="custom-input"
          >

          <ApolloMutation
            :mutation="require('~/gql/addToCart.gql')"
            :refetch-queries="() => [{ query: require('~/gql/getCart.gql') }]"
            :variables="{
              productId: product.id,
              quantity: parseInt(qty)
            }"
            @done="onDone"
            @error="onError"
          >
            <template v-slot="{ mutate, loading }">
              <button :disabled="loading || errorStock" class="custom-button" @click="addToCart(mutate)">
                Add to cart
              </button>

              <span v-if="errorStock && product.meta._stock > 0" class="stock-error">
                There are only {{ product.meta._stock || 0 }} items in stock
              </span>
            </template>
          </ApolloMutation>
        </div>

        <span class="stock-info">in stock: {{ product.meta._stock || 0 }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { DEFAULT_IMAGE } from '~/helpers/index.js'

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
    onDone(e) {
      this.qty = 1
    },
    onError(e) {
      // TODO: implement notification toast with error
      // eslint-disable-next-line no-console
      console.log(e.message)
    },
    addToCart(cb) {
      const hasToken = !!this.$apolloHelpers.getToken()

      if (hasToken) cb()
      else this.$router.push({ path: '/login' })
    }
  }
}
</script>

<style scoped>
.product {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-column-gap: 20px;
  max-width: 1140px;
  margin: 0 auto;
  margin-bottom: 20px;
  padding-bottom: 20px;
}

img {
  width: 100%;
  max-width: 400px;
}

.product-title {
  font-size: 26px;
  margin-bottom: 26px;
}

.product-price {
  margin-bottom: 20px;
  color: darkgreen;
  display: inline-block;
  font-size: 26px;
}

@media screen and (max-width: 420px) {
  .product {
    border-bottom: 1px solid gray;
  }

  .product-content {
    padding: 20px 20px 0;
  }
}

.stock-info {
  margin-top: 15px;
  display: inline-block;
}

.product-price + div {
  display: flex;
  flex-direction: row;
}

button {
  margin-left: 10px;
}

.stock-error {
  color: #e43f2e;
}
</style>
