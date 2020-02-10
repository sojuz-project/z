<template>
  <li>
    <router-link :to="modalPath" class="link-to-cart icon" aria-label="cart">
      <span>
        <Icon :blockAttrs="iconAttrs" />
      </span>
      <client-only>
        <span v-if="cart > 0" class="cart-counter">
          {{ cart }}
        </span>
      </client-only>
    </router-link>
  </li>
</template>

<script>
import { cartHash } from '~/helpers/cartSession';

export default {
  name: 'CartButton',
  components: {
    Icon: () => import('~/components/icons/Icon'),
  },
  computed: {
    modalPath() {
      const separator = this.$route.path && this.$route.path[this.$route.path.length - 1] !== '/' ? '/' : '';
      return `${this.$route.path}${separator}modal/cart-page`;
    },
  },
  data() {
    return {
      iconAttrs: { name: 'cart', strokeWeight: 1.1 },
    };
  },
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
    innerHtml: {
      type: String,
      default: '',
    },
  },
  apollo: {
    cart: {
      query: require('./getCart.gql'),
      skip() {
        return !process.client;
      },
      variables() {
        return {
          cart_hash: cartHash(),
        };
      },
      update(data) {
        const { get_cart } = data;
        return get_cart && get_cart.cart ? Object.values(get_cart.cart).length : 0;
      },
    },
  },
};
</script>

<style>
.link-to-cart {
  position: relative;
  line-height: initial !important;
}

.cart-button {
  width: 30px;
}

.cart-counter {
  display: flex;
  justify-content: center;
  position: absolute;
  align-items: center;
  bottom: 10px;
  right: 10px;
  background: #ffffff;
  font-size: 10px;
  border-radius: 8px;
  width: 16px;
  height: 16px;
  color: black;
  border: 1px solid #616161;
}
</style>
