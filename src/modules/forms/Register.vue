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
    <nuxt-link :to="modalPathLogin">Do you have an account? Login</nuxt-link>
  </div>
</template>

<script>
import Vue from 'vue';

export default {
  name: 'RegisterPage',
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
          attrs: { fieldName: 'email', label: 'Email', type: 'mail', required: 'true' },
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
    modalPathLogin() {
      const routePath = this.$route.path.split('modal')[0];
      const separator = routePath && routePath[routePath.length - 1] === '/' ? '' : '/';
      return `${routePath}${separator}modal/login`;
    },
  },
  methods: {
    updateData(value, fieldName) {
      this.updatedForm = { ...this.updatedForm, [fieldName]: value };
    },
    async submit() {
      this.loading = true;

      try {
        const { data: { register: { token } = {} } = {} } = await this.$apollo.mutate({
          mutation: require('~/modules/forms/gql/register.gql'),
          variables: {
            user: this.updatedForm,
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
