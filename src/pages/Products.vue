<template>
  <div class="container">
    <page-header title="Products" />

    <product-list />
  </div>
</template>

<script>
import PageHeader from '~/components/PageHeader.vue'
import ProductList from '~/components/ProductList.vue'

export default {
  name: 'PeoductsPage',
  components: {
    ProductList,
    PageHeader
  }
}
</script>
