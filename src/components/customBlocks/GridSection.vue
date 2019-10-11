<template>
  <section :class="['grid-section']">
    {{ attrs }}
    <inner-block v-for="(component, j) in section" :key="j" />
  </section>
</template>
<script>
export default {
  name: 'GridComponent',
  props: {
    section: {
      type: Array,
      default: () => [],
    },
    attrs: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    blockStyle() {
      return this.attrs || this.attrs.style.block;
    },
  },
  // methods: {
  //   replaceHtml: function(template, layout) {
  //     // replace innerHTML (gutenberg fix)
  //     // add tagnames (gutenberg fix)
  //     return template.attrs.innerHTML
  //       ? {
  //           ...template,
  //           innerHTML: layout.tagName
  //             ? `<${layout.tagName}>${template.attrs.innerHTML}</${layout.tagName}>`
  //             : template.attrs.innerHTML,
  //         }
  //       : template;
  //   },
  // },
};
</script>
<style src="styleBase/custom-blocks/grid-container.css"></style>
