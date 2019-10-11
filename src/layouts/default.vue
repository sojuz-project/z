<template>
  <div>
    <Header />
    <search-input />
    <nuxt />
  </div>
</template>

<script>
import Header from '~/components/pagePartials/Header.vue';
import SearchInput from '~/components/customBlocks/SearchInput.vue';

export default {
  name: 'DefaultLayout',
  components: {
    Header,
    SearchInput,
  },
};
</script>
