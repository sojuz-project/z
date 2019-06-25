<template>
  <div>
    <div v-scroll-reveal.reset="{ distance: '20px', delay: 100}" class="title">
      {{ attrs.title }}
    </div>
    <ul v-scroll-reveal.reset="{ distance: '20px', delay: 200 }" class="list">
      <li
        v-for="(item, i) in attrs.gallery"
        :key="i"
        :class="{'active':( activeSlideIndex === i ),'inactive':( activeSlideIndex !== i )}"
        @click="changeSlideList(i)"
        v-html="item.content"
      />
    </ul>
    <ul v-scroll-reveal.reset="{ distance: '20px', delay: 300 }" class="content">
      <li
        v-for="(item, i) in attrs.gallery"
        :key="i"
        :class="['nav-li',{'active':( activeSlideIndex === i ),'inactive':( activeSlideIndex !== i )}]"
      >
        <div v-if="activeSlideIndex === i" v-scroll-reveal.reset="{ distance: '20px' }">
          <p v-html="item.description"/>
          <img width="100%" :src="item.image.url" >
        </div>
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
  },
  data: function () {
    return {
      activeSlideIndex: 0
    }
  },
  methods: {
    changeSlideList: function (index) {
      this.activeSlideIndex = index
      // this.$refs.siema.siema.goTo(index)
    }
    // changeSlide: function () {
    //   this.activeSlideIndex = this.$refs.siema.siema.currentSlide
    // }
  }
}
</script>
