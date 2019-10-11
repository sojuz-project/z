<template>
  <div>
    <h2>My wishlist</h2>
    {{ products }}
  </div>
</template>
<script>
// import Options from '~/gql/options.gql';
import BillingForm from '~/components/forms/billing.vue';
export default {
  components: {},
  apollo: {
    products: {
      query: require('~/gql/products.gql'),
      variables: { post_type: ['product'] },
      prefetch: true,
    },
  },
};
</script>
