<template>
  <client-only>
    <div>
      <div
        :class="['inner-wrapper', blockAttrs.className, isInCart ? 'active' : '', loading && 'cart-loading']"
        @click="() => !loading && wooAddToCart()"
        :disabled="errorStock"
      >
        <Icon
          :blockAttrs="{
            name: 'cart',
            size: 20,
            stroke: isInCart ? '#fff' : '#000',
            strokeWeight: 1.1,
            fill: isInCart ? '#000' : '#fff',
          }"
        />
      </div>
      <span v-if="errorStock && blockAttrs.meta._stock > 0" class="stock-error">
        There are only {{ blockAttrs.meta._stock || 0 }} items in stock
      </span>
    </div>
  </client-only>
</template>

<script>
import { cartHash } from '~/helpers/cartSession';

export default {
  name: 'AddToCart',
  components: {
    Icon: () => import('~/components/icons/Icon'),
  },
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
    qty: {
      type: Number,
      default: 1,
    },
    errorStock: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      loading: false,
    };
  },
  apollo: {
    isInCart: {
      query: require('./getCart.gql'),
      variables() {
        return {
          cart_hash: cartHash(),
        };
      },
      skip() {
        return !this.blockAttrs.id;
      },
      update(data) {
        const { get_cart } = data;
        const cart = get_cart && get_cart.cart ? Object.values(get_cart.cart) : [];
        return cart.some(({ product_id }) => product_id === this.blockAttrs.id);
      },
    },
  },
  methods: {
    async wooAddToCart() {
      if (this.isInCart) {
        this.$updateToast({ msg: 'This product exist in your cart', type: 'warning' });
        return;
      }

      try {
        this.loading = true;
        const { data } = await this.$apollo.mutate({
          mutation: require('./addToCart.gql'),
          variables: {
            productId: this.blockAttrs.id,
            quantity: this.qty,
            cart_key: cartHash(),
          },
          refetchQueries: [{ query: require('./getCart.gql'), variables: { cart_hash: cartHash() } }],
        });

        if (!window.sessionStorage.cart_hash && data.add_to_cart.cookies) {
          window.sessionStorage.cart_hash = data.add_to_cart.cookies;
        }

        this.$updateToast({ msg: 'Product add product to cart successfull', type: 'success' });
      } catch (e) {
        this.$updateToast({ msg: 'Something went wrong :(', type: 'warning' });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
<style scoped>
.AddToCart .active {
  background-color: #000;
}
.cart-loading {
  opacity: 0.4;
}
</style>
