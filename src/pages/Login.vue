<template>
  <div class="container">
    <ApolloMutation :mutation="require('~/gql/login.gql')" :variables="{ username, password }" @done="onDone">
      <template v-slot="{ mutate, loading }">
        <div class="wrapper">
          <form
            @submit.prevent="
              () => {
                loginError = '';
                mutate();
              }
            "
          >
            <input v-model="username" placeholder="Username" required="required" class="custom-input" />

            <input v-model="password" placeholder="Password" required="required" class="custom-input" type="password" />

            <button class="custom-button" type="submit" :disabled="loading">
              Log in
            </button>
          </form>

          <span v-if="loginError && !loading" class="error-login">{{ loginError }}</span>
        </div>
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
        this.$router.go(-1);
      } else {
        this.loginError =
          parseInt(status) === 403 ? "User with given credentials doesn't exis" : 'Something went wrong';
      }
    },
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  flex-direction: column;
  margin: 40px auto;
  max-width: 250px;
}

input {
  margin-bottom: 15px;
}

.error-login {
  color: #e43f2e;
  margin-top: 20px;
  text-align: center;
}
</style>
