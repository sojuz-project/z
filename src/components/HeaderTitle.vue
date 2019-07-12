<template>
  <component
    :is="tag"
    v-text="title"
  />
</template>

<script>
export default {
  props: {
    i: {
      type: Number,
      default: 0
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
