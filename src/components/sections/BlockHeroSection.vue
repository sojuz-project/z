<template>
  <section>
    <div v-scroll-reveal.reset="{ distance: '20px', delay: 400 }" class="images">
      <no-ssr>
        <siema
          ref="siema"
          class="slider"
          @change="changeSlide()"
          :auto-play=true
          :loop=true
        >
          <div v-for="(item, i) in attrs.gallery" :key="i" style="font-size:50em">
            <img
              v-if="item.image.sizes"
              width="100%"
              :srcset="`${item.image.sizes.medium.url} ${item.image.sizes.medium.width}w,
            ${item.image.sizes.large.url} ${item.image.sizes.large.width}w`"
              :sizes="`(max-width: 600px) 400px, 800px`"
              :src="item.image.url"
            >
            <img
              v-else
              width="100%"
              :src="item.image.url"
            >
          </div>
        </siema>
      </no-ssr>
    </div>
    <div
      v-scroll-reveal.reset="{distance: '20px' , delay: 300 }"
      class="title"
      :style="{
        'text-shadow': `3px 3px 0 ${attrs.backgroundColor}`,
      }"
    >
      {{ attrs.title }}
    </div>
    <ul v-scroll-reveal.reset="{ distance: '20px', delay: 400 }" class="list">
      <li
        v-for="(item, i) in attrs.gallery"
        :key="i"
        :style="{
          'text-shadow': `1px 1px 0 ${attrs.backgroundColor}`,
        }"
        style="1px 1px 0 #ccc;"
        :class="{'active':( activeSlideIndex === i ),'inactive':( activeSlideIndex !== i )}"
        @click="changeSlideList(i)"
      >
        <span class="number">0{{ i + 1 }}</span>
        <span class="text">{{ item.content }}</span>
      </li>
    </ul>
    <div v-scroll-reveal.reset="{ distance: '20px', delay: 500 }" class="call">
      <div>
        <nuxt-link class="button__bold" :to="attrs.actionButtonTarget">
          {{ attrs.actionButtonLabel }}
        </nuxt-link>
      </div>
    </div>
    <div v-if="iteration===0" class="first-footer"  v-scroll-reveal.reset="{ distance: '20px', delay: 200 }">
      <MouseScroll/>
    </div>
  </section>
</template>

<script>
import MouseScroll from '~/components/MouseScroll'
export default {
  components: {
    MouseScroll
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
      this.$refs.siema.siema.goTo(index)
    },
    changeSlide: function () {
      this.activeSlideIndex = this.$refs.siema.siema.currentSlide
    }
  }
}
</script>

<style scoped>
.active {
}
.inactive {
}
</style>
