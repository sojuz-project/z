<template>
  <li v-if="isLogged">
    <a @click="() => $loginHelpers.onLogout()" href="#">Log out</a>
  </li>
</template>

<script>
export default {
  name: 'LogoutMenuItem',
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  apollo: {
    isLogged: {
      query: require('~/modules/login/isLogged.gql'),
    },
  },
};
</script>
