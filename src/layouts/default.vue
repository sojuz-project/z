<template>
  <div>
    <header>
      <block-header />
    </header>
    <toast-message />
    <nuxt />
    <block-footer />
    <!-- <inner-block v-for="block in footer.blocks" :key="block.blockName" :blocks="block" /> -->
  </div>
</template>

<script>
import BlockHeader from '~/components/custom/BlockHeader.vue';
import BlockFooter from '~/components/custom/BlockFooter.vue';
import ToastMessage from '~/modules/toast/ToastMessage.vue';
import gql from 'graphql-tag';

export default {
  name: 'DefaultLayout',
  components: {
    // PageWrapper,
    // BlocksStatic,
    BlockHeader,
    BlockFooter,
    ToastMessage,
  },
};
</script>
