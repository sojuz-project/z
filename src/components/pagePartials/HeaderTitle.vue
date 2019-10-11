<template>
  <component
    :is="tag"
  >
    <span
      :style="{backgroundColor:bg}"
      v-html="title"
    >
      {{ title }}
    </span>
  </component>
</template>

<script>
export default {
  props: {
    i: {
      type: Number,
      default: 0
    },
    bg: {
      type: String,
      default: '#fff'
    },
    title: {
      type: String,
      default: 'Head section title'
    }
  },
  computed: {
    tag() {
      return this.i === 0 ? 'h1' : 'h2'
    }
  }
}
</script>
