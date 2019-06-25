<template>
  <nuxt-link to="/" >
    <div
      v-if="options && options.option_value.custom_logo"
      class="main-logo"
      :style="{
        'visibility': 'hidden'
      }"
      v-scroll-reveal="{ opacity: 0, delay:200 }"
    >
      <img src="https://webartisan.itinfo.pl/backend/wp-content/uploads/2019/06/Webartisan-logo-1.svg" alt="main logo">
    </div>
  </nuxt-link>
</template>

<script>
import Options from '~/gql/options.gql'
// import Attachments from '~/gql/attachments.gql'
export default {
  apollo: {
    options: {
      variables: {
        option_name: 'theme_mods_twentynineteen'
      },
      query: Options
      // updated: opts => opts.option_value.custom_logo
    }
    // attachments: {
    //   variables() {
    //     return {
    //       ids: [this.apollo.data.options.option_value.custom_logo]
    //     }
    //   },
    //   query: Attachments,
    //   skip() { return this.apollo && !this.apollo.data.options }
    // }
  }
}
</script>
