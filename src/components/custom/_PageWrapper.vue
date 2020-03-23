<template>
  <div
    :id="$route.params.slug ? $route.params.slug : ''"
    :style="`background-image:url('${get_theme_mod.background_image}')`"
    :class="['layout', get_theme_mod.background_class]"
  >
    <slot></slot>
  </div>
</template>
<script>
export default {
  apollo: {
    get_theme_mod: {
      query: require('~/gql/core/get_theme_mod.gql'),
    },
  },
};
</script>
