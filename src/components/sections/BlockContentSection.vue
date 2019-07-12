<template>
  <section>
    <HeaderTitle
      v-if="attrs.title"
      v-scroll-reveal="$root.initialRoute ? { distance: '20px', delay: 100 } : { opacity:1 }"
      :class="['entry-title', attrs.titleAlign]"
      :title="attrs.title"
      :i="iteration"
    />
    <Thumbnail
      v-if="attrs.thumbImage"
      v-scroll-reveal="$root.initialRoute ? { distance: '20px', delay: 100 } : { opacity:1 }"
      class="entry-thumbnail"
      :item="attrs.thumbImage"
      :size="attrs.imageSize"
    />
    <div
      v-if="attrs.excerpt"
      v-scroll-reveal="$root.initialRoute ? { distance: '20px', delay: 100 } : { opacity:1 }"
      :class="['entry-excerpt', attrs.excerptAlign]"
      :style="{
        'color': attrs.excerptColor,
      }"
      v-html="attrs.excerpt"
    />
    <div
      v-if="attrs.content"
      v-scroll-reveal="$root.initialRoute ? { distance: '20px', delay: 100 } : { opacity:1 }"
      :class="['entry-content', attrs.contentAlign]"
      v-html="attrs.content"
    />
  </section>
</template>

<script>
import HeaderTitle from '~/components/HeaderTitle'
import Thumbnail from '~/components/Thumbnail'
import(`~/css/${process.env.STYLE_BASE}/grid/content-grid.css`)
import(`~/css/${process.env.STYLE_BASE}/decorate/content-decorate.css`)
export default {
  components: {
    HeaderTitle,
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
  created() {
    // eslint-disable-next-line no-console
    console.log(`~/css/${process.env.STYLE_BASE}/grid/content/content-grid-${this.attrs.gridCss}.css`)
    import(`~/css/${process.env.STYLE_BASE}/grid/content/content-grid-${this.attrs.gridCss}.css`)
  }
}
</script>
