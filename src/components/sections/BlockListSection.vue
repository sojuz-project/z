<template>
  <section :style="{ 'background-color': attrs.backgroundColor }">
    <HeaderTitle
      v-scroll-reveal="$root.initialRoute ? { distance: '20px' } : { opacity:100 }"
      class="entry-title"
      :title="attrs.title"
      :i="iteration"
    />
    <ul
      v-if="attrs.gridCss !== 'hero-slider'"
      class="entry-list"
    >
      <li
        v-for="(item, i) in attrs.richList"
        :key="i"
      >
        <Thumbnail :item="item.image"/>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="entry-title" v-html="item.content"/>
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div class="entry-content" v-html="item.description"/>
      </li>
    </ul>
    <div
      v-if="attrs.gridCss === 'hero-slider'"
      class="entry-slider"
    >
      <siema
        ref="siema"
        class="slider"
        :auto-play="true"
        :loop="true"
        @change="changeSlide()"
      >
        <Thumbnail
          v-for="(item, i) in attrs.richList"
          :key="i"
          class="entry-thumbnail"
          :item="item.image"
        />
      </siema>
    </div>
    <ul
      v-if="attrs.gridCss === 'hero-slider'"
      v-scroll-reveal="$root.initialRoute ? { distance: '20px', delay: 200 } : { opacity:100 }"
      class="entry-list"
    >
      <li
        v-for="(item, i) in attrs.richList"
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
  </section>
</template>

<script>
import Thumbnail from '~/components/Thumbnail'
import HeaderTitle from '~/components/HeaderTitle'
import(`~/css/${process.env.STYLE_BASE}/grid/list-grid.css`)
import(`~/css/${process.env.STYLE_BASE}/decorate/list-decorate.css`)

export default {
  components: {
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
