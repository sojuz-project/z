<template>
  <PageWrapper>
    <BlocksStatic tag-name="header" content-slug="header_template_slug" />
    <ToastMessage />
    <nuxt />
    <BlocksStatic tag-name="footer" content-slug="footer_template_slug" />
    <div id="css_files" style="border:1px solid red;"></div>
  </PageWrapper>
</template>

<script>
import PageWrapper from '~/components/custom/PageWrapper.vue';
import BlocksStatic from '~/components/custom/BlocksStatic.vue';
import ToastMessage from '~/modules/toast/ToastMessage.vue';

export default {
  name: 'CustomizeLayout',
  components: {
    PageWrapper,
    BlocksStatic,
    ToastMessage,
  },
  mounted: function() {
    window.addEventListener('message', this.iframe, false);
    if (!this.inIframe()) {
      window.location.href = 'https://docker.local/sojuz-project';
    }
  },
  beforeDestroy: function() {
    window.removeEventListener('message', this.iframe, false);
  },
  methods: {
    inIframe() {
      try {
        return window.self !== window.top;
      } catch (e) {
        return true;
      }
    },
    iframe(event) {
      if ((event.data.value && typeof event.data.value === 'string') || event.data.value instanceof String) {
        const css_files = document.getElementById('css_files');
        while (css_files.firstChild) {
          css_files.removeChild(css_files.firstChild);
        }
        JSON.parse(event.data.value).map((el) => {
          if (el.selected) {
            console.log('/sojuz-project/css/global/' + el.file);
            const node = document.createElement('link');
            node.setAttribute('rel', 'stylesheet');
            node.setAttribute('type', 'text/css');
            node.setAttribute('href', '/sojuz-project/css/global/' + el.file);
            css_files.appendChild(node);
          }
        });
        var event = new CustomEvent('myCustomEvent', { loaded: true });
        window.parent.document.dispatchEvent(event);
      }
    },
  },
};
</script>
