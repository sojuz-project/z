<template>
  <header
    id="top-bar"
    :key="get_theme_mod"
    :style="{
      'background-color': get_theme_mod
    }"
  >
    <Logo
      class="main-logo"
    />
    <MainMenu :background="get_theme_mod" />
  </header>
</template>

<script>
import Logo from '~/components/pagePartials/Logo.vue'
import MainMenu from '~/components/pagePartials/MainMenu.vue'
import ThemeMods from '~/gql/themeMods.gql'

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
        if (ctc.get_theme_mod) {
          return ctc.get_theme_mod.header_color
        }
      }
    }
  }
}
</script>
<style src="styleBase/topbar.css"></style>
