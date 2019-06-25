<template>
  <ApolloQuery
    :query="require('~/gql/getCart.gql')"
  >
    <template slot-scope="{ result: { loading, error, data } }">
      <router-link to="/cart" class="link-to-cart">
        <img src="~/assets/cart.svg" alt="cart" class="cart-button" >

        <span v-if="data && data.get_cart && Object.keys(data.get_cart).length > 0" class="cart-counter">
          {{ Object.keys(data.get_cart).length }}
        </span>
      </router-link>
    </template>
  </ApolloQuery>
</template>

<script>
export default {
  name: 'CartButton'
}
</script>

<style>
.link-to-cart {
  position: relative;
}

.cart-button {
  width: 30px;
}

.cart-counter {
  display: flex;
  justify-content: center;
  position: absolute;
  top: -20px;
  right: -10px;
  background: #e43f2e;
  border-radius: 8px;
  width: 24px;
  height: 16px;
  color: white;
}
</style>
