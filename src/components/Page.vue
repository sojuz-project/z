<template>
  <div id="page" :class="{ subpage: $route.path !== '/' }">
    <MainMessage ref="main-message"></MainMessage>
    <BlocksTraverse :query-params="$route.params" />
    <router-view />
  </div>
</template>
<script>
import BlocksTraverse from '~/components/BlocksTraverse.vue';
// import Options from '~/gql/options.gql';

export default {
  components: {
    BlocksTraverse,
  },
  // mounted() {
  //   // this.updateMessage({ msg: 'Test message', type: 'error' });
  // },
  // beforeRouteUpdate(to, from, next) {
  //   console.log(this.route, this.route.path.substr(1));
  //   next();
  // },
  // apollo: {
  //   options: {
  //     variables: {
  //       option_name: 'page_on_front',
  //     },
  //     query: Options,
  //     result({ data }) {
  //       data.options && data.options.option_value == 0
  //         ? this.updateMessage({ msg: 'Set any WP page as home in admin panes', type: 'warning' })
  //         : false;
  //     },
  //   },
  // },
};
</script>
<style src="styleBase/atomic-css.css"></style>
<style src="styleBase/main_message.css"></style>
