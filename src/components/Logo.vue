<template>
  <nuxt-link to="/">
    <div
      v-if="get_theme_mod && get_theme_mod.custom_logo"
      class="main-logo"
    >
      <img :src="get_theme_mod.custom_logo.src" alt="Main-logo" >
    </div>
  </nuxt-link>
</template>

<script>
// import Options from '~/gql/options.gql'
// import Attachments from '~/gql/attachments.gql'
import ThemeMods from '~/gql/themeMods.gql'
export default {
  apollo: {
    get_theme_mod: {
      variables: {
        names: ['custom_logo']
      },
      query: ThemeMods
    }
    // options: {
    //   variables: {
    //     option_name: 'theme_mods_zero'
    //   },
    //   query: Options
    //   // updated: opts => opts.option_value.custom_logo
    // },
    // attachments: {
    //   variables() {
    //     return {
    //       ids: [11]
    //     }
    //   },
    //   query: Attachments
    //   // skip() { return this.apollo && !this.apollo.data.options }
    // }
  }
}
</script>
