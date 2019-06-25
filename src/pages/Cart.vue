<template>
  <div class="container">
    <page-header title="Cart" />

    <div v-if="cartData.length">
      <table style="width:100%">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total price</th>
            <th/>
          </tr>
        </thead>

        <tbody>
          <tr v-for="item in cartData" :key="item.key">
            <td>{{ item.product_name }}</td>
            <td>{{ item.line_total / item.quantity }}</td>
            <td>{{ item.quantity }}</td>
            <td>{{ item.line_total }}</td>
            <td>
              <ApolloMutation
                :mutation="require('~/gql/removeFromCart.gql')"
                :refetch-queries="() => [{ query: require('~/gql/getCart.gql') }]"
                :variables="{ item: item.key }"
              >
                <template v-slot="{ mutate, loading }">
                  <button class="custom-button custom-button_red" :disabled="loading" @click="mutate">
                    Delete
                  </button>
                </template>
              </ApolloMutation>
            </td>
          </tr>
        </tbody>
      </table>

      <div class="summary">
        <ApolloMutation
          :mutation="require('~/gql/clearCart.gql')"
          :refetch-queries="() => [{ query: require('~/gql/getCart.gql') }]"
        >
          <template v-slot="{ mutate, loading }">
            <button class="custom-button custom-button_red" :disabled="loading" @click="mutate">
              Clear cart
            </button>
          </template>
        </ApolloMutation>

        <div>
          Total price:{{ }}
          <span>
            {{ totalPrice }}
          </span>
        </div>
      </div>
    </div>

    <div v-else-if="!$apollo.loading" class="no-products">
      No products in cart
    </div>
  </div>
</template>

<script>
import PageHeader from '~/components/PageHeader.vue'

export default {
  name: 'CartPage',
  middleware: 'isAuth',
  components: {
    PageHeader
  },
  data() {
    return {
      cartData: []
    }
  },
  apollo: {
    cartData: {
      query: require('~/gql/getCart.gql'),
      update(data) {
        return (data && data.get_cart)
          ? Object.values(data.get_cart)
          : []
      },
      prefetch: true,
      fetchPolicy: 'network-only'
    }
  },
  computed: {
    totalPrice() {
      return this.cartData.reduce((acc, { line_total: t }) => acc + t, 0)
    }
  }
}
</script>

<style>
.summary {
  border-top: 1px solid gray;
  padding-top: 20px;
  margin-top: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.summary span {
  margin-right: 20px;
  font-size: 26px;
  color: darkgreen;
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
  font-weight: 600;
}

tr > th:last-of-type {
  border: none;
}

tr > td:last-of-type > div {
  display: flex;
  justify-content: center;
}
</style>
