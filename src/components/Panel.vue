<template>
  <div id="panel" :class="{ subpage: $route.path !== '/' }">
    <MainMessage ref="main-message"></MainMessage>
    <div v-if="$apolloHelpers.getToken()" class="panel">
      <Sidebar class="panel-sidebar"></Sidebar>
      <div :is="$route.params.slug" class="panel-body"></div>
    </div>
    <router-view />
  </div>
</template>
<script>
// import Options from '~/gql/options.gql';
import Sidebar from '~/components/panel/Sidebar.vue';
export default {
  
  components: {
    Sidebar,
    billing: () => import(/* webpackChunkName: "corecolumn" */'~/components/panel/Billing'),
     bookmarks: () => import(/* webpackChunkName: "corecolumn" */'~/components/panel/Bookmarks'),
  },
};
</script>
<style src="styleBase/main_message.css"></style>
<style src="styleBase/user_panel.css"></style>
