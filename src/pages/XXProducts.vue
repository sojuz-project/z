<template>
  <div id="page" :class="{ subpage: $route.path !== '/' }">
    <product-list />
  </div>
</template>

<script>
import ProductList from '~/components/ecommerce/ProductList.vue';

export default {
  transition: 'smooth',
  name: 'PeoductsPage',
  components: {
    ProductList,
  },
};
</script>
