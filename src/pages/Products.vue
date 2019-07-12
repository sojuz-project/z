<template>
  <div id="page" :class="{'subpage':($route.path !== '/')}">
    <Header/>
    <page-header title="Products" />
    <section>
      <product-list />
    </section>
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import PageHeader from '~/components/PageHeader.vue'
import ProductList from '~/components/ProductList.vue'

export default {
  name: 'PeoductsPage',
  components: {
    Header,
    ProductList,
    PageHeader
  }
}
</script>
