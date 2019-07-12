<template>
  <div id="page" :class="{'subpage':($route.path !== '/')}">
    <Header/>
    <h1
      v-if="options && options.option_value == 0"
      style="font-size:100em; padding:20em"
    >
      Set any WP page as "home" in admin panes
    </h1>
    <BlocksList
      v-if="options && options.option_value != 0 && $route.path === '/'"
      :query-params="{ id: parseInt(options.option_value) }"
      class="site-content"
    />
    <BlocksList
      v-if="$route.path !== '/'"
      :query-params="{ slug: $route.path.substr(1) }"
      class="site-content"
    />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import BlocksList from '~/components/BlocksList.vue'
import Options from '~/gql/options.gql'

export default {
  components: {
    Header,
    BlocksList
  },
  beforeRouteUpdate(to, from, next) {
    this.$root.initialRoute = !!from
    next()
  },
  apollo: {
    options: {
      variables: {
        option_name: 'page_on_front'
      },
      query: Options
    }
  }
}
</script>
