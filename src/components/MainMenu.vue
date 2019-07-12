<template>
  <ul v-if="menus" class="main-menu">
    <li
      v-for="(item, i) in menus.items"
      :key="i"
    >
      <nuxt-link
        class="underline"
        :to="item.navitem.post_name"
        :aria-label="`Read more about ${item.navitem.post_name}`"
      >
        {{ item.navitem.post_title }}
      </nuxt-link>
    </li>
  </ul>
</template>
<script>
import Menus from '~/gql/menus.gql'

export default {
  apollo: {
    menus: {
      variables: {
        name: 'main-menu'
      },
      query: Menus
    }
  }
}
</script>
