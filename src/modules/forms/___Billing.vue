<template>
  <div class="container">
    BILLING
    <form @submit.prevent="submit(mutate)">
      <inner-block v-for="(block, i) in blocks" :key="i" :blocks="block" />
      <div class="button wp-block-button aligncenter">
        <button :disabled="loading" class="wp-block-button" type="submit">
          Save changes
        </button>
      </div>
    </form>
    <!-- <social-share network="facebook">share on facebook</social-share>
    <social-share network="twitter">
      <button>share on twitter</button> -->
    <!-- </social-share> -->
    <!-- <span v-if="loginError && !loading" class="error-login">{{ loginError }}</span> -->
  </div>
</template>

<script>
import Vue from 'vue';
// import SocialShare from '~/components/social/SocialShare';
const billingData = Vue.observable({});

export default {
  name: 'BillingPage',
  middleware: 'isAuth',
  // components: {
  //   SocialShare,
  // },
  provide() {
    return {
      formData: billingData,
      updateData: () => '',
    };
  },
  data() {
    return {
      loading: false,
      blocks: [
        {
          blockName: 'custominput',
          attrs: { fieldName: 'first_name', label: 'First name', required: 'true', className: 'f-self-2' },
        },
        {
          blockName: 'custominput',
          attrs: { fieldName: 'last_name', label: 'Last name', className: 'f-self-2' },
        },
        {
          blockName: 'custominput',
          attrs: { fieldName: 'email', label: 'Email address', required: 'true' },
        },
        // {
        //   blockName: 'custominput',
        //   attrs: { label: 'Company/Organization', required: 'true' } },

        {
          blockName: 'custominput',
          attrs: { fieldName: 'address_1', label: 'Address', required: 'true' },
        },
        // {
        //   blockName: 'custominput',
        //   attrs: { fieldName: 'email', label: 'Apartment', required: 'true', className: 'f-self-2' } },
        {
          blockName: 'custominput',
          attrs: { fieldName: 'country', label: 'Country', required: 'true', className: 'f-self-2' },
        },
        {
          blockName: 'custominput',
          attrs: { fieldName: 'city', label: 'City', required: 'true', className: 'f-self-2' },
        },
        {
          blockName: 'custominput',
          attrs: { fieldName: 'state', label: 'State/province/region', required: 'true', className: 'f-self-2' },
        },
        {
          blockName: 'custominput',
          attrs: { fieldName: 'postcode', label: 'ZIP/Postal code', required: 'true', className: 'f-self-2' },
        },
        // {
        //   blockName: 'custominput',
        //   attrs: { fieldName: 'email', label: 'EU VAT identification number', required: 'true', className: 'f-self-2' },
        // },
        // {
        //   blockName: 'custominput',
        //   attrs: { fieldName: 'email', label: 'Company no.', required: 'true', className: 'f-self-2' },
        // },
      ],
    };
  },
  methods: {
    submit() {
      this.loading = true;
      this.$apollo
        .mutate({
          mutation: require('~/modules/forms/gql/updateProfile.gql'),
          variables: {
            user: {
              ...this.my_profile.my_profile,
              // username: this.my_profile.my_profile.username,
              // email: this.my_profile.my_profile.email,
              // password: this.my_profile.my_profile.password,
              billing: billingData,
            },
          },
        })
        .finally(() => (this.loading = false));
    },
  },
  apollo: {
    my_profile: {
      query: require('~/modules/forms/gql/myBilling.gql'),
      update(data) {
        delete data.my_profile.__typename;
        delete data.my_profile.billing.__typename;
        for (let key in data.my_profile.billing) {
          // if (key !== 'company') {
          //  ...
          // }
          billingData[key] = data.my_profile.billing[key];
        }
        return data;
      },
    },
  },
};
</script>
