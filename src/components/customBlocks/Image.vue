<template>
  <div :class="attrs.className" :style="attrs.style">
    <img :src="attrs.url" />
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
      // browserWidth: document.documentElement.getBoundingClientRect().width,
    };
  },
  created: function() {
    // `this` points to the vm instance
    // console.log(this);
  },
  methods: {
    // generateSrcset: function(items) {
    //   const srcSet = [];
    //   for (const item in items) {
    //     srcSet.push(`${items[item].url} ${items[item].width}w`);
    //   }
    //   return srcSet.join(', ');
    // },
    // generateSizes: function (items) {
    //   const sizes = []
    //   for (const item in items) {
    //     sizes.push(`(max-width: ${items[item].width}px) ${items[item].width}`)
    //   }
    //   return sizes.join(', ')
    // }
  },
};
</script>
<style src="styleBase/custom-blocks/custom-image.css"></style>
