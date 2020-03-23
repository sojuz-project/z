<template>
  <nav class="main-menu">
    <ul>
      <li class="primary">
        <ul>
          <li v-for="(item, k) in menus && menus.items" :key="k">
            <nuxt-link :to="item.navitem.post_name">{{ item.navitem.post_title }}</nuxt-link>
          </li>
        </ul>
      </li>
    </ul>
  </nav>
</template>
<script>
import Menus from '~/gql/menus.gql';

export default {
  props: {
    menuLocation: {
      type: String,
      default: 'main-menu',
    },
  },
  apollo: {
    menus: {
      skip() {
        return !this.menuLocation;
      },
      variables() {
        return {
          name: this.menuLocation,
        };
      },
      query: require('~/gql/menus.gql'),
    },
  },
};
</script>
