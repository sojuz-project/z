<template>
  <div>
    <div ref="card"></div>
    <button @click="purchase" :disabled="loading">Purchase</button>
  </div>
</template>

<script>
// add script: [{ src: 'https://js.stripe.com/v3/' }], script tag to header in this component
export default {
  props: {
    orderSecret: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      stripe: null,
      card: null,
      loading: false,
    };
  },
  mounted() {
    this.stripe = Stripe(`pk_test_fQF1GCP5CrtRspylFgYYGAIR00y7ch7x5K`);
    this.card = this.stripe.elements().create('card');
    this.card.mount(this.$refs.card);
  },
  methods: {
    async purchase() {
      this.loading = true;

      try {
        const { error, paymentIntent } = await this.stripe.confirmCardPayment(this.orderSecret, {
          payment_method: { card: this.card },
        });

        if (error) {
          this.$updateToast({ msg: error.message, type: 'error' });
        } else if (paymentIntent.status === 'succeeded') {
          this.$updateToast({ msg: 'Success :)', type: 'success' });
        }
      } catch (e) {
        this.$updateToast({ msg: 'Connection error :(', type: 'error' });
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
