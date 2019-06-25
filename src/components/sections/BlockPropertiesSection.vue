<template>
  <div>
    <div v-scroll-reveal.reset="{ distance: '20px' }" class="title">
      {{ attrs.title }}
    </div>
    <ul class="list">
      <li
        v-for="(item, i) in attrs.richList"
        :key="i"
        v-scroll-reveal.reset="{ distance: '20px', delay: `${i}00` }"
      >
        <img :src="item.image.url">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="title" v-html="item.content"/>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="content" v-html="item.description"/>
      </li>
    </ul>
    <div v-if="iteration===0" class="first-footer">
      <img src="~/assets/Scroll-icon.svg" alt="scroll">
    </div>
  </div>
</template>

<script>
export default {
  components: {
    // BlockHeroSection
  },
  props: {
    attrs: {
      type: Object,
      default: () => ({})
    },
    iteration: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style scoped>
.active{

}
.inactive{

}
</style>
