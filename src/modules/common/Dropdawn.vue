<template>
  <div @click="isDropdownActive = !isDropdownActive" :class="{ 'is-active': isDropdownActive }" class="dropdown left">
    <a aria-haspopup="true" aria-controls="{ 'dropdown-menu'}">
      <span class="bold">{{ selected }}</span>
    </a>
    <div class="nav-sub" role="menu">
      <slot></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    attrs: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isDropdownActive: false,
    };
  },
  computed: {
    selected() {
      return this.attrs.selected || this.attrs.label;
    },
  },
};
</script>
