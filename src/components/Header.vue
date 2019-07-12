<template>
  <header
    id="top-bar"
    :style="{
      'background-color': get_theme_mod
    }"
    :key="get_theme_mod"
  >
    <Logo
      class="main-logo"
    />
    <MainMenu/>
  </header>
</template>

<script>
import Logo from '~/components/Logo.vue'
import MainMenu from '~/components/MainMenu.vue'
import ThemeMods from '~/gql/themeMods.gql'

import(`~/css/${process.env.STYLE_BASE}/decorate/topbar-decorate.css`)
import(`~/css/${process.env.STYLE_BASE}/grid/topbar-grid.css`)
export default {
  components: {
    Logo,
    MainMenu
  },
  data() {
    return {
      get_theme_mod: 'transparent'
    }
  },
  apollo: {
    get_theme_mod: {
      variables: {
        names: ['header_color']
      },
      query: ThemeMods,
      update(ctc) {
        return ctc.get_theme_mod.header_color
      }
    }
  }
}
</script>
