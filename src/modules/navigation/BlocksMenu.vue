<!-- SOJUZ DOC

@module: Navigation
@submodule: BlocksMenu
@description: Navigation dropdown item
@attrs:
  -
    name: <p>menuLocation</p>
    description: <p>Register WP menu name</p>
    type: string
    default: null
  -
    name: <p>className</p>
    description: <p>class name or spaced class list</p>
    type: string
    default: null
  - 
    name: <p>icon</p>
    description: <p>Icon properties ['name']</p>
    type: object
    default: null

!SOJUZ DOC -->
<template>
  <nav>
    <ul :class="blockAttrs.className">
      <inner-block v-for="block in blocksMenu || {}" :key="block.blockName" :blocks="block" />
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    // TODO - implement this
    // checkMenu() {
    //   return this.$isMobile() ? 'main-mobile-menu' : 'main-menu';
    // },
  },
  apollo: {
    blocksMenu: {
      query: require('./gql/get_blocks_menu.gql'),
      variables() {
        return {
          slug: this.blockAttrs.menuLocation,
        };
      },
      update({ blocksMenu }) {
        if (blocksMenu) {
          /** TODO - add this destruct on serversiede */
          let out = blocksMenu.blocks.map((el) => {
            let destAttrs = {
              ...el.attrs,
              ...{ ...el.attrs['component-attrs'] },
              ...{ className: el.attrs['classes'].toString() },
            };
            delete destAttrs['component-attrs'];
            delete destAttrs['classes'];
            return { ...el, attrs: destAttrs };
          });
          return out;
        }
      },
    },
  },
};
</script>
