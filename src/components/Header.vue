<template>
  <header
    id="top-bar"
    v-scroll-reveal="{ opacity: 0 }"
    :style="{
      'visibility': 'hidden',
    }"
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
export default {
  components: {
    Logo,
    MainMenu
  }
}
</script>
