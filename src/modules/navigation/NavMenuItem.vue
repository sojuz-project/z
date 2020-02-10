/** 
 @module Navigation
 @submodule Navigation item
 @slug NavItem
 @dependencies Icon, isLogged
 @attrs
  --- isLogged
    ```
      Render item only for logged users
    ```
  --- object
    ```
      Wordpress menu type: page - build routing url by slug, custom - build routing url by type string )
    ```
*/
<template>
  <li :class="blockAttrs.className" >
    <template v-if="!blockAttrs.isLogged || Boolean(blockAttrs.isLogged) == isLogged " >
      <nuxt-link v-if="blockAttrs && blockAttrs.object != 'custom'" :to="blockAttrs.url ? blockAttrs.url : blockAttrs.slug" >
        <span v-if="blockAttrs.icon">
          <Icon
              :blockAttrs="{
                viewBox: blockAttrs.icon.viewBox ? blockAttrs.icon.viewBox : '0 0 32 32',
                size: blockAttrs.icon.size ? blockAttrs.icon.size : 32,
                name: blockAttrs.icon.name,
                fill: blockAttrs.icon.fill ? blockAttrs.icon.fill : '#fff',
                strokeWeight: 1.1,
              }"
            />
        </span>
        <span v-if="!blockAttrs || !blockAttrs.hideName">{{ blockAttrs.title ? blockAttrs.title : blockAttrs.name}}</span>
      </nuxt-link>

      <a v-if="blockAttrs && blockAttrs.object == 'custom'" :href="blockAttrs.url ? blockAttrs.url : ''" target="_blank" >
        <span v-if="blockAttrs.icon">
          <Icon
              :blockAttrs="{
                viewBox: blockAttrs.icon.viewBox ? blockAttrs.icon.viewBox : '0 0 32 32',
                size: blockAttrs.icon.size ? blockAttrs.icon.size : 32,
                name: blockAttrs.icon.name,
                fill: blockAttrs.icon.fill ? blockAttrs.icon.fill : '#fff',
                strokeWeight: 1.1,
              }"
            />
        </span>
        <span v-if="!blockAttrs || !blockAttrs.hideName">{{ blockAttrs.title }}</span>
      </a>
    </template>
  </li>
</template>
<script>
export default {
  components: {
    Icon: () => import('~/components/icons/Icon'),
  },
  apollo: {
    isLogged: {
      query: require('~/modules/login/isLogged.gql'),
    },
  },
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
