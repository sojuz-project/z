<template>
  <component
    :is="$apolloHelpers.getToken() ? 'AddToCartLogged' : 'AddToCartSession'"
    :product="attrs.data"
    :qty="qty"
    :on-add="onAdd"
  >
    <template v-slot="{ addToCart, loading }">
      <div :disabled="loading || errorStock" :class="['add-to-cart','button__bold']" @click="addToCart">
        <IcoCart :attrs="{weight:200}"/>
      </div>
      <span v-if="errorStock && product.meta._stock > 0" class="stock-error">
        There are only {{ product.meta._stock || 0 }} items in stock
      </span>
    </template>
  </component>
</template>

<script>
import AddToCartSession from '~/components/ecommerce/AddToCartSession'
import AddToCartLogged from '~/components/ecommerce/AddToCartLogged'

export default {
  name: 'AddToCartWrapper',
  components: {
    IcoCart: () => import('~/components/icons/Cart'),
    AddToCartSession,
    AddToCartLogged
  },
  props: {
    attrs: {
      type: Object,
      default: () => ({})
    },
    onAdd: {
      type: Function,
      default: () => null
    },
    qty: {
      type: Number,
      default: 1
    },
    errorStock: {
      type: Boolean,
      default: false
    }
  }
}
</script>
