<template>
  <div>
    <div
      class="image"
      :style="{
        'background': `linear-gradient(0deg, #fff 50px, ${attrs.backgroundColor} 50px)`
      }"
    >
      <Thumbnail :item="attrs.thumbImage" width="60vw"/>
    </div>
    <div
      class="title"
      :style="{
        'background': `linear-gradient(0deg, #fff 50px, ${attrs.backgroundColor} 50px)`
      }"
    >
      {{ attrs.title }}
    </div>
    <div
      class="back"
      :style="{
        'background': attrs.backgroundColor,
      }"
      @click="$router.go(-1)"
    >
      <img src="~/assets/arrow-left.svg" alt="back-arrow" >
      Back to home
    </div>
    <div v-scroll-reveal.reset="{ distance: '20px', delay: 100 }" class="subtitle">{{ attrs.subTitle }}</div>
    <div
      v-scroll-reveal.reset="{ distance: '20px', delay: 150 }"
      class="entry-excerpt"
      :style="{
        'color': attrs.excerptColor,
      }"
    >
      {{ attrs.excerpt }}
    </div>
    <div
      v-scroll-reveal.reset="{ distance: '20px', delay: 200 }"
      class="content"
      v-html="attrs.content"
    />
  </div>
</template>

<script>
import Thumbnail from '~/components/Thumbnail'
import(`~/css/${process.env.STYLE_BASE}/grid/about-grid.css`)
import(`~/css/${process.env.STYLE_BASE}/decorate/about-decorate.css`)
export default {
  components: {
    Thumbnail
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
  methods: {
    generateSrcset: function (items) {
      const srcSet = []
      for (const item in items) {
        srcSet.push(`${items[item].url} ${items[item].width}w`)
      }
      return srcSet.join(', ')
    },
    generateSizes: function (items) {
      const sizes = []
      for (const item in items) {
        sizes.push(`(max-width: ${items[item].width}px) ${items[item].width}px`)
      }
      return sizes.join(', ')
    }
  }
}
</script>
