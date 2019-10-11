<template>
  <div class="container">
    <ApolloMutation
      :mutation="require('~/gql/login.gql')"
      :variables="{ username, password }"
      @done="onDone"
      @error="onError"
    >
      <template v-slot="{ mutate, loading }">
        <form
          @submit.prevent="
            () => {
              loginError = '';
              mutate();
            }
          "
        >
          <label class="has-ultrasmall-font-size">
            Email or username
          </label>
          <input v-model="username" class="has-ultrasmall-font-size" placeholder="Username" required="required" />
          <label class="has-ultrasmall-font-size">
            Password
          </label>
          <input
            v-model="password"
            placeholder="Password"
            required="required"
            class="has-ultrasmall-font-size"
            type="password"
          />
          <div class="button wp-block-button aligncenter">
            <button :disabled="loading" class="wp-block-button__link" type="submit">Log in</button>
          </div>
        </form>
        <!-- <span v-if="loginError && !loading" class="error-login">{{ loginError }}</span> -->
      </template>
    </ApolloMutation>
  </div>
</template>

<script>
export default {
  transition: 'smooth',
  name: 'LoginPage',
  middleware: 'isAuth',
  data() {
    return {
      username: '',
      password: '',
      loginError: null,
    };
  },
  methods: {
    async onDone({ data }) {
      const { token, data: { status } = {} } = data.login;
      if (token) {
        await this.$apolloHelpers.onLogin(token);
        this.updateMessage({ msg: 'You are login NOW', type: 'success' });
      } else {
        const loginError =
          parseInt(status) === 403 ? "User with given credentials doesn't exis" : 'Something went wrong';
        this.updateMessage({ msg: loginError, type: 'error' });
      }
      this.$router.push({ path: this.$route.path.split('modal')[0] });
    },
    onError(error) {
      const loginError =
        parseInt(error.status) === 403 ? "User with given credentials doesn't exis" : 'Something went wrong';
      this.updateMessage({ msg: loginError, type: 'error' });
      this.$router.push({ path: this.$route.path.split('modal')[0] });
    },
  },
};
</script>
<style src="styleBase/core/core-button.css"></style>
