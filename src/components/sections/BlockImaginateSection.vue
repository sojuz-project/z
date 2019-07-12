<template>
  <section
    :style="{
      'background': attrs.backgroundColor,
    }"
  >
    <div
      v-scroll-reveal.reset="{ distance: '20px' }"
      class="content"
      v-html="attrs.content"
    />
    <div v-scroll-reveal.reset="{ distance: '20px', delay:100 }" class="image">
      <Thumbnail :item="attrs.thumbImage" width="60vw"/>
    </div>
  </section>
</template>

<script>
import Thumbnail from '~/components/Thumbnail'
import(`~/css/${process.env.STYLE_BASE}/grid/imaginate-grid.css`)
import(`~/css/${process.env.STYLE_BASE}/decorate/imaginate-decorate.css`)

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
  }
}
</script>
