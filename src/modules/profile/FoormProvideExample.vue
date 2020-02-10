<template>
  <div class="container">
    <!-- {{ provideData }} -->
    <!-- <hr /> -->
    <!-- {{ this.$apollo.queries.my_profile.options.variables.res }} -->
    <form v-if="this.$apollo.queries.my_profile.options.variables.res" @submit.prevent="submit()">
      <inner-block v-for="(block, i) in blocks" :key="i" :blocks="block" />
      <div class="button wp-block-button aligncenter">
        <button :disabled="loading" class="wp-block-button" type="submit">
          Save changes
        </button>
      </div>
    </form>
    <social-share network="facebook">share on facebook</social-share>
    <social-share network="twitter">
      <button>share on twitter</button>
    </social-share>
    <!-- <span v-if="loginError && !loading" class="error-login">{{ loginError }}</span> -->
  </div>
</template>

<script>
import Vue from 'vue';
import SocialShare from '~/components/social/SocialShare';
// const provideData = Vue.observable({});

export default {
  name: 'BillingPage',
  middleware: 'isAuth',
  components: {
    SocialShare,
  },
  provide() {
    console.log('with provide');
    return {
      formData: () => this.provideData,
      updateData: this.updateData,
    };
  },
  data() {
    return {
      updatedForm: {},
      loading: false,
      blocks: [
        {
          blockName: 'cgbblockwrapper',
          attrs: { className: 'flex f-childs-100', tagName: 'div' },
          innerBlocks: [
            {
              blockName: 'custominput',
              attrs: { fieldName: 'first_name', label: 'First name', required: 'true' },
            },
            {
              blockName: 'custominput',
              attrs: { fieldName: 'last_name', label: 'Last name' },
            },
            {
              blockName: 'custominput',
              attrs: { fieldName: 'email', label: 'Email address', required: 'true' },
            },
            {
              blockName: 'custominput',
              attrs: { fieldName: 'avatar_url', label: 'Avatar url' },
            },
          ],
        },
      ],
    };
  },
  computed: {
    provideData() {
      return this.$apollo.queries.my_profile && this.$apollo.queries.my_profile.options.variables.res;
    },
  },
  // mounted() {
  //   this.$apollo.queries.my_profile.skip = false;
  //   for (let key in this.$apollo.queries.my_profile.options.variables.response) {
  //     this.provideData[key] = this.$apollo.queries.my_profile.options.variables.response[key];
  //   }
  //   console.log('provider', this.provideData);
  // },
  methods: {
    updateData(value, fieldName) {
      this.updatedForm = { ...this.updatedForm, [fieldName]: value };
    },
    submit() {
      this.loading = true;
      this.$apollo
        .mutate({
          mutation: require('./updateProfile.gql'),
          variables: {
            user: {
              // ...this.provideData,
              first_name: this.provideData.first_name,
              last_name: this.provideData.last_name,
              email: this.provideData.email,
              ...this.updatedForm,
            },
          },
        })
        .finally(() => (this.loading = false));
    },
  },
  apollo: {
    my_profile: {
      variables: { res: null },
      query: require('./myProfile.gql'),
      update(data) {
        let tech = {};
        delete data.my_profile.__typename;
        for (let key in data.my_profile) {
          tech[key] = data.my_profile[key];
        }
        this.$set(this.$apollo.queries.my_profile.options.variables, 'res', tech);
        this.$forceUpdate();
      },
    },
  },
};
</script>
<style src="~/css/custom-blocks/custom-form.css"></style>
<style src="~/css/core/core-button.css"></style>
