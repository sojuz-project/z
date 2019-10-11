<template>
  <component
    :is="blockName"
    :class="['block', blockName]"
    :innerHtml="blocks.innerHTML"
    :attrs="blocks.attrs"
  >
    <inner-block
      v-for="(block, k) in blocks.innerBlocks"
      :key="k"
      :ref="`ref-${blockName}-${k}`"
      :blocks="block"
    />
  </component>
</template>
<script>
export default {
  components: {
    corecolumn: () => import(/* webpackChunkName: "corecolumn" */'~/components/core/Column'),
    corecolumns: () => import(/* webpackChunkName: "corecolumns" */'~/components/core/Columns'),
    coreparagraph: () => import(/* webpackChunkName: "paragraph" */'~/components/core/Paragraph'),
    coreimage: () => import(/* webpackChunkName: "image" */'~/components/core/Image'),
    coregallery: () => import(/* webpackChunkName: "galerry" */'~/components/core/Gallery'),
    corecover: () => import(/* webpackChunkName: "cover" */'~/components/core/Cover'),
    coreseparator: () => import(/* webpackChunkName: "separator" */'~/components/core/Separator'),
    coreheading: () => import(/* webpackChunkName: "heading" */'~/components/core/Heading'),
    customimage: () => import(/* webpackChunkName: "image" */'~/components/customBlocks/Image'),
    sojuzblockgridcontainer: () => import(/* webpackChunkName: "gridcontainer" */'~/components/customBlocks/GridContainer'),
    customwrapper: () => import(/* webpackChunkName: "gridcomponentwrapper" */'~/components/customBlocks/ComponentWrapper'),
    corebutton: () => import(/* webpackChunkName: "gridcomponentbutton" */'~/components/core/Button'),
   
   // // List: () => import('~/components/core/default'),
    // // Quote: () => import('~/components/core/default'),
    // // Audio: () => import('~/components/core/default'),
    // // File: () => import('~/components/core/default'),
    // // Video: () => import('~/components/core/default'),
    // // Preformatted: () => import('~/components/core/default'),
    // // Code: () => import('~/components/core/default'),
    // // Freeform: () => import('~/components/core/default'),
    // // Html: () => import('~/components/core/default'),
    // GPullquote: () => import('~/components/core/Pullquote'),
    // // Table: () => import('~/components/core/default'),
    // GVerse: () => import('~/components/core/Verse'),
    
    // GColumns: () => import('~/components/core/Columns'),
    // GSeparator: () => import('~/components/core/Separator'),
    // GSpacer: () => import('~/components/core/Spacer')
  },
  props: {
    blocks: {
      type: Object,
      default: () => {},
    },
  },
  name: 'inner-block',
  computed: {
    blockName() {
      return this.blocks.blockName.replace(/[\/-]/g, '');
    },
  },
}
</script>
