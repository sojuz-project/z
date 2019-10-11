<template>
  <router-link to="/cart" class="link-to-cart" aria-label="cart">
    <IcoCart :attrs="{weight:200}"  class="cart-button"/>
    <span v-if="itemsInCart > 0" class="cart-counter">
      {{ itemsInCart }}
    </span>
  </router-link>
</template>

<script>
import { cartSession, getCart, cartHash } from '~/helpers/cartSession'

export default {
  name: 'CartButton',
  components: {
    IcoCart: () => import('~/components/icons/Cart'),
  },
  computed: {
    itemsInCart() {
      return this.$apolloHelpers.getToken() ? this.cartItems : cartSession.productsCount
    }
  },
  apollo: {
    cartItems: {
      query: require('~/gql/getCart.gql'),
      variables() {
        return {
          cart_hash: cartHash()
        }
      },
      // skip() {
      //   return !cartHash() && !this.$apolloHelpers.getToken()
      // },
      update(data) {
        return (data && data.get_cart)
          ? Object.keys(data.get_cart).length
          : 0
      },
      prefetch: true,
      fetchPolicy: 'network-only'
    }
  },
  mounted() {
    if (!this.$apolloHelpers.getToken()) {
      cartSession.productsCount = getCart().length
    }
  }
}
</script>

<style>
.link-to-cart {
  position: relative;
  padding:initial !important;
  line-height: initial !important;
}

.cart-button {
  width: 30px;
}

.cart-counter {
  display: flex;
    justify-content: center;
    position: absolute;
    align-items: center;
    bottom: 0.2vw;
    right: -0.2vw;
    background: #ffffff;
    font-size: 10px;
    border-radius: 8px;
    width: 16px;
    height: 16px;
    color: black;
    border: 1px solid #616161;
}
</style>
