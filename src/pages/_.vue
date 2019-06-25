<template>
  <div id="page">
    <Header/>
    <h1
      v-if="options && options.option_value == 0"
      style="font-size:100em; padding:20em"
    >
      Set any WP page as "home" in admin panes
    </h1>
    <BlocksListByID
      v-if="options && options.option_value != 0 && $route.path === '/'"
      :id="parseInt(options.option_value)"
      class="site-content"
    />
    <BlocksListBySlug
      v-if="$route.path !== '/'"
      :slug="$route.path.substr(1)"
      class="site-content"
    />
  </div>
</template>

<script>
import Header from '~/components/Header.vue'
import BlocksListBySlug from '~/components/BlocksListBySlug.vue'
import BlocksListByID from '~/components/BlocksListByID.vue'
import Options from '~/gql/options.gql'

export default {
  components: {
    Header,
    BlocksListBySlug,
    BlocksListByID
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
