<template>
  <PageWrapper>
    <BlocksStatic tag-name="header" content-slug="header_template_slug" />
    <ToastMessage />
    <nuxt />
    <BlocksStatic tag-name="footer" content-slug="footer_template_slug" />
  </PageWrapper>
</template>

<script>
import PageWrapper from '~/components/custom/PageWrapper.vue';
import BlocksStatic from '~/components/custom/BlocksStatic.vue';
import ToastMessage from '~/modules/toast/ToastMessage.vue';

export default {
  name: 'DefaultLayout',
  components: {
    PageWrapper,
    BlocksStatic,
    ToastMessage,
  },
};
</script>
