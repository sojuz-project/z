<template>
  <li>
    <nuxt-link v-if="!isLogged" :to="modalPath" class="menu-link">
      Login/register
    </nuxt-link>
  </li>
</template>

<script>
export default {
  name: 'LoginMenuItem',
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    modalPath() {
      const separator = this.$route.path && this.$route.path[this.$route.path.length - 1] !== '/' ? '/' : '';
      return `${this.$route.path}${separator}modal/login`;
    },
  },
  apollo: {
    isLogged: {
      query: require('~/modules/login/isLogged.gql'),
    },
  },
};
</script>
