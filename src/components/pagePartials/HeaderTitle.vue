<template functional>
  <component :is="props.i === 0 ? 'h1' : 'h2'">
    <span :style="{ backgroundColor: props.bg }" v-html="props.title">
      {{ props.title }}
    </span>
  </component>
</template>

<script>
export default {
  props: {
    i: {
      type: Number,
      default: 0,
    },
    bg: {
      type: String,
      default: '#fff',
    },
    title: {
      type: String,
      default: 'Head section title',
    },
  },
};
</script>
