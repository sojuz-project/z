<template>
  <div>
    <h2>Billing informations</h2>
    <BillingForm></BillingForm>
  </div>
</template>
<script>
// import Options from '~/gql/options.gql';
import BillingForm from '~/components/forms/billing.vue';
export default {
  components: {
    BillingForm,
  },
};
</script>
