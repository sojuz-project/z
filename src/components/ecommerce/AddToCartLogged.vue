<template>
  <div>
    <ApolloMutation
      :mutation="require('~/gql/addToCart.gql')"
      :refetch-queries="() => [{ query: require('~/gql/getCart.gql'), variables: { cart_hash: cartHash() } }]"
      :variables="{
        productId: product.id,
        quantity: qty,
        cart_key: cartHash(),
      }"
      @done="onDone"
      @error="onError"
    >
      <template v-slot="{ mutate, loading }">
        <slot :loading="loading" :addToCart="() => addToCart(mutate)" />
      </template>
    </ApolloMutation>
  </div>
</template>

<script>
import { cartHash } from '~/helpers/cartSession';

export default {
  name: 'AddToCart',
  props: {
    product: {
      type: Object,
      default: () => ({}),
    },
    onAdd: {
      type: Function,
      default: () => null,
    },
    qty: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      cartHash,
    };
  },
  methods: {
    onDone(e) {
      this.onAdd();
      window.sessionStorage.cart_hash = e.data.add_to_cart.cookies.join('; ');
      delete e.data.add_to_cart.cookies;
    },
    onError(e) {
      // TODO: implement notification toast with error
    },
    addToCart(cb) {
      cb();
      // const hasToken = !!this.$apolloHelpers.getToken()

      // if (hasToken) cb()
      // else this.$router.push({ path: '/login' })
    },
  },
};
</script>
