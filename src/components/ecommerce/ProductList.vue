<template>
  <section class="entry block-list-section horizontal-3 products">
    <ul v-if="products" class="entry-list">
      <product v-for="product in products" :key="product.key" :product="product" class="list-item" />
    </ul>
    <div v-else class="no-result apollo">
      No products
    </div>
  </section>
</template>

<script>
import { mapMetas } from '~/helpers/index.js';
import Product from '~/components/ecommerce/Product.vue';

export default {
  name: 'ProductList',
  components: {
    Product,
  },
  data() {
    return {
      products: [],
    };
  },
  computed: {
    productsIds() {
      return this.products.map((el) => el.id);
    },
  },
  apollo: {
    products: {
      query: require('~/gql/products.gql'),
      variables: { post_type: ['product'] },
      update(data) {
        return data && data.posts && data.posts.length > 0
          ? data.posts.map(({ post_meta: meta, ...product }) => ({ ...product, meta: mapMetas(meta) }))
          : [];
      },
      prefetch: true,
    },
    $subscribe: {
      tagAdded: {
        query: require('~/gql/productsSubscription.gql'),
        variables() {
          return {
            products: this.productsIds,
          };
        },
        result({ data }) {
          const { stock_state: state = {} } = data;
          this.products = this.products.map((product) =>
            product.id === state.product_id
              ? {
                  ...product,
                  meta: {
                    ...product.meta,
                    _stock: state.quantity,
                    _stock_status: state.status,
                  },
                }
              : product
          );
        },
      },
    },
  },
};
</script>
