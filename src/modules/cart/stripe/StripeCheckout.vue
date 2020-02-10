<template>
  <div>
    <div @click="getCheckoutToken">pay</div>

    <stripe v-if="orderSecret" :order-secret="orderSecret" />
  </div>
</template>

<script>
import { cartHash } from '~/helpers/cartSession';
import Stripe from '~/components/ecommerce/Stripe.vue';

export default {
  name: 'CheckoutPayment',
  components: { Stripe },
  data() {
    return {
      orderSecret: null,
    };
  },
  apollo: {
    line_items: {
      query: require('../getCart.gql'),
      variables() {
        return {
          cart_hash: cartHash(),
        };
      },
      update(data) {
        const { get_cart } = data;
        const cart = get_cart && get_cart.cart ? Object.values(get_cart.cart) : [];
        return cart.map((item) => ({
          itemKey: item.key,
          product_id: item.product_id,
          variation_id: item.variation_id,
          quantity: item.quantity,
        }));
      },
    },
  },
  methods: {
    async getCheckoutToken() {
      const {
        data: {
          checkout: { meta_data },
        },
      } = await this.$apollo.mutate({
        mutation: require('./checkout.gql'),
        variables: {
          order: {
            payment_method: 'stripe',
            line_items: this.line_items,
          },
        },
      });

      console.log(meta_data);
    },
  },
};
</script>

<style></style>
