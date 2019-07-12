<template>
  <section>
    <div
      v-scroll-reveal="$root.initialRoute ? { distance: '20px', delay: 100 } : { opacity:100 }"
      class="entry-images"
    >
      <no-ssr>
        <siema
          ref="siema"
          class="slider"
          :auto-play="true"
          :loop="true"
          @change="changeSlide()"
        >
          <Thumbnail
            v-for="(item, i) in attrs.gallery"
            :key="i"
            class="entry-thumbnail"
            :item="item.image"
          />
        </siema>
      </no-ssr>
    </div>
    <HeaderTitle
      v-scroll-reveal="$root.initialRoute ? { distance: '20px', delay: 150 } : { opacity:100 }"
      class="entry-title"
      :style="{
        'text-shadow': `3px 3px 0 ${attrs.backgroundColor}`,
      }"
      :title="attrs.title"
      :i="iteration"
    />
    <ul
      v-scroll-reveal="$root.initialRoute ? { distance: '20px', delay: 200 } : { opacity:100 }"
      class="entry-list"
    >
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
        <span class="number">[ 0{{ i + 1 }} ]</span>
        <span class="text">{{ item.content }}</span>
      </li>
    </ul>
    <div
      v-scroll-reveal="$root.initialRoute ? { distance: '20px', delay: 250 } : { opacity:100 }"
      class="entry-call"
    >
      <div>
        <nuxt-link class="button__bold" :to="attrs.actionButtonTarget">{{ attrs.actionButtonLabel }}</nuxt-link>
      </div>
    </div>
    <div
      v-if="iteration===0"
      v-scroll-reveal="$root.initialRoute ? { distance: '20px', delay: 300 } : { opacity:100 }"
      class="section-footer"
    >
      <MouseScroll :color="attrs.textColor" />
    </div>
  </section>
</template>

<script>
import MouseScroll from '~/components/MouseScroll'
import Thumbnail from '~/components/Thumbnail'
import HeaderTitle from '~/components/HeaderTitle'

import(`~/css/${process.env.STYLE_BASE}/decorate/hero-decorate.css`)

export default {
  components: {
    MouseScroll,
    Thumbnail,
    HeaderTitle
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
<style>
  /* Main grid properties */
  .block-hero-section {
    display: grid;
    grid-template-rows: auto;
    grid-template-areas:
      ". main-slider-title main-slider-images ."
      ". main-slider-list main-slider-images ."
      ". main-slider-call main-slider-images ."
      ". main-slider-footer main-slider-footer.";
    grid-template-columns:  auto 40% 40% auto;
    padding: 5vw 1vw
  }
  .block-hero-section  .entry-title {
    grid-area: main-slider-title;
  }
  .block-hero-section  .entry-list {
    grid-area: main-slider-list;
  }
  .block-hero-section  .entry-images {
    grid-area: main-slider-images;
  }
  .block-hero-section  .entry-call {
    grid-area: main-slider-call;
  }
  .block-hero-section  .section-footer {
    grid-area: main-slider-footer;
  }
  .block-hero-section .entry-images .slider{
    width:100%;
  }
</style>
