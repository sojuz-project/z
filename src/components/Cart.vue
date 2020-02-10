<template>
  <div class="container pad-0-10">
    <h2>Cart</h2>
    <div v-if="cart && cart.length > 0" class="">
      <table style="width:100% ">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>
              <span v-if="$isMobile()">Qty.</span>
              <span v-if="!$isMobile()">Quantity</span>
            </th>
            <th>Total price</th>
            <th />
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in cart" :key="item.key">
            <td>{{ item.product_name }}</td>
            <td>{{ item.line_total / item.quantity }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.line_total }}</td>
            <td>
              <ApolloMutation
                :mutation="require('~/modules/cart/removeFromCart.gql')"
                :refetch-queries="
                  () => [{ query: require('~/modules/cart/getCart.gql'), variables: { cart_hash: cartHash() } }]
                "
                :variables="{ item: item.key, cart_key: cartHash() }"
              >
                <template v-slot="{ mutate, loading }">
                  <button @click="mutate">
                  <Icon
                    class="active"
                    
                    :disabled="loading"
                    :blockAttrs="{
                      name: 'close',
                      strokeWeight: 1.1,
                    }"
                  />
                  </button>
                </template>
              </ApolloMutation>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="summary">
        <div>
          Total price:&nbsp;
          <span>
            {{ $data.$wooCartTotalPrice }}
          </span>
        </div>

        <ApolloMutation
          :mutation="require('~/modules/cart/clearCart.gql')"
          :variables="{ cart_key: cartHash() }"
          :refetch-queries="
            () => [{ query: require('~/modules/cart/getCart.gql'), variables: { cart_hash: cartHash() } }]
          "
        >
          <!-- @done="clearSession"  -->
          <template v-slot="{ mutate, loading }">
            <button :disabled="loading" @click="mutate" class="wp-block-button is-style-outline">
              Clear cart
            </button>
          </template>
        </ApolloMutation>
        <div class="wp-block-button ">
          <nuxt-link
            to="/modal/checkout"
            class="wp-block-button__link has-text-color has-white-color has-background has-dark-gray-background-color"
            >Proceed to checkout</nuxt-link
          >
        </div>
      </div>
    </div>

    <div v-else-if="!$apollo.loading" class="no-products">
      Cart is empty
    </div>
  </div>
</template>

<script>
import { cartHash } from '~/helpers/cartSession';

export default {
  transition: 'smooth',
  name: 'CartPage',
  components: {
    Icon: () => import('~/components/icons/Icon'),
  },
  data() {
    return {
      cartHash,
    };
  },
  apollo: {
    cart: {
      query: require('~/modules/cart/getCart.gql'),
      variables() {
        return {
          cart_hash: cartHash(),
        };
      },
      update(data) {
        const { get_cart } = data;
        return get_cart && get_cart.cart ? Object.values(get_cart.cart) : [];
      },
    },
  },
};
</script>

<style>
.summary {
  border-top: 1px solid gray;
  padding-top: 20px;
  margin-top: 30px;
  display: flex;
  align-items: flex-end;
  flex-direction: column;
}

.summary span {
  margin-right: 1vw;
  font-size: 2vw;
  color: darkgreen;
  line-height: 4vw;
}

.no-products {
  color: #e43f2e;
}

table {
  border-collapse: collapse;
  margin: 0;
  padding: 0;
  background: white;
}

table td,
table th {
  border: 1px solid #dfdfdf;
  padding: 10px;
  text-align: left;
}

table th {
  font-weight: 400;
}

tr > th:last-of-type {
  border: none;
}

tr > td:last-of-type > div {
  display: flex;
  justify-content: center;
}
</style>
<style src="~/css/core/core-button.css"></style>
