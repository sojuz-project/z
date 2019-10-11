<template>
  <div>
    <slot :loading="false" :add-to-cart="() => addToCart(product, qty)" />
  </div>
</template>

<script>
import { cartSession, setCart, getCart } from '~/helpers/cartSession'

export default {
  name: 'AddToCart',
  props: {
    product: {
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
    }
  },
  data() {
    return {
      cartSession
    }
  },
  methods: {
    addToCart(product, quantity) {
      const currentCart = getCart()
      const isInCart = currentCart.find(({ id }) => id === product.id)
      const updatedCart = isInCart
        ? currentCart.map(productObj => productObj.id === product.id ? { ...productObj, quantity } : productObj)
        : [...currentCart, { ...product, quantity }]

      setCart(updatedCart)
      cartSession.productsCount = updatedCart.length
      this.onAdd()
    }
  }
}
</script>
