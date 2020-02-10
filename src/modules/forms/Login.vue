<template>
  <div class="container">
    <form @submit.prevent="submit()">
      <inner-block v-for="(block, i) in blocks" :key="i" :blocks="block" />
      <div class="button wp-block-button aligncenter">
        <button
          :disabled="loading"
          class="wp-block-button has-text-color has-white-color has-background has-dark-gray-background-color"
          type="submit"
        >
          Save changes
        </button>
      </div>
    </form>

    <nuxt-link :to="modalPathRegister">Want to create an account? Register Here</nuxt-link>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'BillingPage',
  middleware: 'isAuth',
  provide() {
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
          blockName: 'custominput',
          attrs: { fieldName: 'username', label: 'User name', required: 'true' },
        },
        {
          blockName: 'custominput',
          attrs: { fieldName: 'password', label: 'Password', type: 'password', required: 'true' },
        },
      ],
    };
  },
  computed: {
    provideData() {
      return {};
    },
    modalPathRegister() {
      const routePath = this.$route.path.split('modal')[0];
      const separator = routePath && routePath[routePath.length - 1] === '/' ? '' : '/';
      return `${routePath}${separator}modal/register`;
    },
  },
  methods: {
    updateData(value, fieldName) {
      this.updatedForm = { ...this.updatedForm, [fieldName]: value };
    },
    async submit() {
      this.loading = true;

      try {
        const { data: { login: { token } = {} } = {} } = await this.$apollo.mutate({
          mutation: require('~/modules/forms/gql/updateLogin.gql'),
          variables: {
            // ...this.provideData,
            username: this.provideData.username,
            password: this.provideData.password,
            ...this.updatedForm,
          },
        });

        this.$loginHelpers.onLogin(token);
      } catch (e) {
        // this.$updateToast({ msg: e, type: 'error' });
      } finally {
        // this.$updateToast({ msg: 'asdasdsad', type: 'error' });
        this.loading = false;
        this.$router.push({ path: this.$route.path.split('modal')[0] });
      }
    },
  },
};
</script>
<style src="~/css/core/core-button.css"></style>
