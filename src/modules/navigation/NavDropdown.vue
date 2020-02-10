<!-- SOJUZ DOC

@module: Navigation
@submodule: Navigation dropdown item
@description: Navigation dropdown item
@dependencies: 
  - Icon 
  - isLogged
@attrs:
  -
    name: <p>atagName</p>
    description: <p>HTML wrapper tag render outside of component </p>
    type: string
    default: li
  -
    name: <p>title</p>
    description: <p>Dropdown display name </p>
    type: string
    default: null
  - 
    name: <p>icon</p>
    description: <p>Icon properties ['name']</p>
    type: object
    default: null

!SOJUZ DOC -->
<template>
  <component :is="blockAttrs && blockAttrs.tagName ||  'li'">
    <template v-if="show">
      
      <ul @click="isDropdownActive = !isDropdownActive" :class="['dropdown', 'right', { 'is-active': isDropdownActive }]">
        <a  href="#" aria-label="expand-profile">
          <span v-if="blockAttrs.icon">
            <Icon
              v-if="!isDropdownActive"
              :blockAttrs="{
                name: blockAttrs.icon.name,
                strokeWeight: 1.1,
              }"
            />
            <Icon
              class="active"
              v-if="isDropdownActive"
              :blockAttrs="{
                name: 'close',
                strokeWeight: 1.1,
              }"
            />
          </span>
          <span v-if="!blockAttrs.hideName">
            {{ blockAttrs.title }}
          </span>
        </a>
        <transition  name="fade"><div v-if="isDropdownActive" class="dropdown-mask"></div></transition>  
        <ul v-if="isDropdownActive" class="nav-v-list inner-border closed nav-sub">
            <slot></slot>
        </ul>
      </ul>
      
    </template>
  </component>
</template>

<script>
export default {
  transition: 'fade',
  components: {
    Icon: () => import('~/components/icons/Icon'),
  },
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isDropdownActive: false,
    };
  },
  beforeUnmount() {
    this.isDropdownActive = false;
  },
  computed: {
    show() {
      return !Boolean(this.blockAttrs.isLogged) || this.isLogged;
    },
  },
  apollo: {
    isLogged: {
      query: require('~/modules/login/isLogged.gql'),
    },
  },
  methods: {
    away() {
      this.isDropdownActive = false;
    },
  },
};
</script>
<style scoped>
.fade-enter-active{
  transition: all 0.3s;
}

.fade-enter
 {
  opacity: 0;
}
</style>
