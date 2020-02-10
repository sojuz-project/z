<template>
  <div class="container">
    <form v-if="!redirect" @submit.prevent="submit()">
      <inner-block v-for="(block, i) in blocks" :key="i" :blocks="block" />
      <div class="button wp-block-button aligncenter">
        <button
          :disabled="loading"
          class="wp-block-button has-text-color has-white-color has-background has-dark-gray-background-color"
          type="submit"
        >
          Proceed to payment
        </button>
      </div>
    </form>
    <client-only>
      <div v-if="redirect">
        <div id="wc-loading" v-if="!checkoutReady">
          <img src="/backend/wp-content/plugins/woocommerce/assets/images/wpspin-2x.gif" />
        </div>
        <iframe
          id="checkoutFrame"
          @load="setupFrame"
          :src="redirect"
          :style="`border: none; width: 800px; visibility: ${checkoutReady ? 'initial' : 'hidden'};`"
          scrolling="no"
        ></iframe>
      </div>
    </client-only>
  </div>
</template>

<script>
import Vue from 'vue';
import { cartHash } from '~/helpers/cartSession';
// import iFrameResize from 'iframe-resizer/js/iframeResizer';

export default {
  name: 'BillingPage',
  middleware: 'isAuth',
  provide() {
    return {
      formData: () => ({ ...this.my_profile, ...this.updatedForm }),
      updateData: this.updateData,
    };
  },
  data() {
    return {
      updatedForm: {},
      redirect: false,
      checkoutReady: false,
      loading: false,
      blocks: [
        {
          blockName: 'cgbblockwrapper',
          attrs: { className: 'flex f-childs-100', tagName: 'div' },
          innerBlocks: [
            {
              blockName: 'custominput',
              attrs: { fieldName: 'first_name', label: 'First name', required: true, className: 'f-self-2' },
            },
            {
              blockName: 'custominput',
              attrs: { fieldName: 'last_name', label: 'Last name', required: true, className: 'f-self-2' },
            },
            {
              blockName: 'custominput',
              attrs: { fieldName: 'address_1', label: 'Address line 1', required: false },
            },
            {
              blockName: 'custominput',
              attrs: { fieldName: 'address_2', label: 'Address line 2', required: false },
            },
            {
              blockName: 'custominput',
              attrs: { fieldName: 'city', label: 'City', required: false, className: 'f-self-2' },
            },
            {
              blockName: 'custominput',
              attrs: { fieldName: 'state', label: 'State', required: false, className: 'f-self-2' },
            },
            {
              blockName: 'custominput',
              attrs: { fieldName: 'postcode', label: 'Postal code', required: false, className: 'f-self-2' },
            },
            {
              blockName: 'custominput',
              attrs: { fieldName: 'country', label: 'Country', required: false, className: 'f-self-2' },
            },
            {
              blockName: 'custominput',
              attrs: { fieldName: 'email', label: 'E-mail', required: true },
            },
            {
              blockName: 'custominput',
              attrs: { fieldName: 'phone', label: 'Phone', required: false },
            },
          ],
        },
      ],
    };
  },
  mounted() {
    window.document.addEventListener('myCustomEvent', (e) => {
      const frame = document.querySelector('iframe');
      frame.height = e.detail + 50;
    });
  },
  methods: {
    setupFrame() {
      this.checkoutReady = true;
    },
    updateData(value, fieldName) {
      Object.assign(this.updatedForm, { [fieldName]: value });
    },
    submit() {
      this.loading = true;
      this.$apollo
        .mutate({
          mutation: require('~/modules/cart/stripe/checkout.gql'),
          variables: {
            order: {
              line_items: this.cart,
              payment_method: 'stripe',
              billing: {
                ...this.updatedForm,
              },
              // // ...this.provideData,
              // first_name: this.provideData.first_name,
              // last_name: this.provideData.last_name,
              // email: this.provideData.email,
              // ...this.updatedForm,
            },
          },
          update: (_, { data: { checkout: { redirect = false } = {} } }) => {
            if (redirect) this.redirect = redirect;
          },
        })
        .finally(() => (this.loading = false));
    },
  },
  apollo: {
    my_profile: {
      query: require('~/modules/forms/gql/myProfile.gql'),
    },
    cart: {
      query: require('~/modules/cart/getCart.gql'),
      variables() {
        return {
          cart_hash: cartHash(),
        };
      },
      update(data) {
        const { get_cart } = data;
        return get_cart && get_cart.cart
          ? Object.values(get_cart.cart).map((item) => {
              return {
                product_id: item.product_id,
                variation_id: item.variation_id,
                quantity: item.quantity,
              };
            })
          : [];
      },
    },
  },
};
</script>

<style src="~/css/core/core-button.css"></style>
<style scoped>
#wc-loading {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 300px;
}
</style>
