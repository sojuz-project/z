<template>
  <svg
    :stroke-width="blockAttrs.strokeWeight ? blockAttrs.strokeWeight : 1"
    :fill="blockAttrs.fill ? blockAttrs.fill : '#fff'"
    :fill-opacity="blockAttrs.fillOpacity ? blockAttrs.fillOpacity : 1"
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="blockAttrs.viewBox ? blockAttrs.viewBox : '0 0 32 32'"
    :width="blockAttrs.size ? blockAttrs.size : 32"
    :height="blockAttrs.size ? blockAttrs.size : 32"
    :stroke="blockAttrs.stroke ? blockAttrs.stroke : 'currentcolor'"
    :stroke-opacity="blockAttrs.strokeOpacity ? blockAttrs.strokeOpacity : 1"
    stroke-linecap="round"
    stroke-linejoin="round"
    :shape-rendering="blockAttrs.shapeRendering ? blockAttrs.shapeRendering : 'geometricPrecision'" 
  >
    <component :is="blockAttrs.name" />
  </svg>
</template>
<script>
/* https://github.com/danklammer/bytesize-icons */
export default {
  components:{
    Hamburger: () => import('~/components/icons/Menu'),
    Close: () => import('~/components/icons/Close'),
    Cart: () => import('~/components/icons/Cart'),
    Like: () => import('~/components/icons/Like'),
    Folder: () => import('~/components/icons/Folder'),
    User: () => import('~/components/icons/User'),
    CaretTop: () => import('~/components/icons/CaretTop'),
    CaretLeft: () => import('~/components/icons/CaretLeft'),
    CaretRight: () => import('~/components/icons/CaretRight'),

    Facebook: () => import('~/components/icons/Facebook'),
    Pinterest: () => import('~/components/icons/Pinterest'),
    Twitter: () => import('~/components/icons/Twitter'),
    Youtube: () => import('~/components/icons/Youtube'),
    Instagram: () => import('~/components/icons/Instagram'),
    Behance: () => import('~/components/icons/Behance'),
  },
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

