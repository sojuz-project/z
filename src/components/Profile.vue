<template>
  <div>
    <div id="panel">
      <Sidebar v-if="!$isMobile()" class="panel-sidebar" />
      <main v-if="mainBlocks" class="panel-body">
        <inner-block v-for="(block, i) in mainBlocks.blocks" :key="block.blockName" :blocks="block" />
      </main>
    </div>
    <router-view />
  </div>
</template>
<script>
import Sidebar from '~/modules/panel/PanelSidebar.vue';
import ToastMessage from '~/modules/toast/ToastMessage.vue';
export default {
  transition: 'smooth',
  components: {
    Sidebar,
    ToastMessage,
  },
  computed: {
    pageSlug() {
      const post_type = this.$route.params.slug;
      // const noses = ['products', 'posts'];
      // const post_type = noses.includes(this.$route.params.slug)
      //   ? this.$route.params.slug.slice(0, -1)
      //   : this.$route.params.slug;
      // const page = this.$route.params.page ? parseInt(this.$route.params.page) : 0;
      return {
        slug: Object.keys(this.$route.params).length ? post_type : '',
        id: !Object.keys(this.$route.params).length ? this.options && parseInt(this.options.page_on_front) : 0,
        // page,
      };
    },
  },
  apollo: {
    mainBlocks: {
      query: require('~/gql/core/get_es_blocks.gql'),
      variables() {
        return this.pageSlug;
      },
    },
    options: {
      query: require('~/gql/core/get_options.gql'),
    },
  },
};
</script>
<style src="~/css/global/panel/panel-default.css""></style>
