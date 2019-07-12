<template>
  <div>
    <div
      :is="block.blockName.substr(6)"
      v-for="(block, i) in filteredPost"
      :id="`section-${i}`"
      :key="i"
      v-scroll-reveal="$root.initialRoute ? { opacity:0 } : { opacity:100 }"
      :class="[
        'entry',
        block.blockName.substr(6),
        block.attrs.gridCss,
        block.attrs.allAlign,
        block.attrs.imageSize
      ]"
      :style="[
        { 'background-color': block.attrs.backgroundColor },
        { 'color': block.attrs.textColor}
      ]"
      :attrs="block.attrs"
      :iteration="i"
    />
  </div>
</template>
<script>
import PostId from '~/gql/blocksById.gql'
import PostSlug from '~/gql/blocksBySlug.gql'

export default {
  components: {
    // BlockHeroSection: () => import('~/components/sections/BlockHeroSection'),
    // BlockAdvantagesSection: () => import('~/components/sections/BlockAdvantagesSection'),
    BlockListSection: () => import('~/components/sections/BlockListSection'),
    // BlockAboutSection: () => import('~/components/sections/BlockAboutSection'),
    // BlockImaginateSection: () => import('~/components/sections/BlockImaginateSection'),
    BlockContentSection: () => import('~/components/sections/BlockContentSection')
  },
  props: {
    queryParams: {
      type: Object,
      default: () => ({})
    }
  },
  computed: {
    filteredPost() {
      const { blocks = [] } = this.post || {}
      return blocks.filter(el => Object.keys(el.attrs).length > 0)
    }
  },
  apollo: {
    post: {
      variables() {
        return this.queryParams
      },
      query() {
        return Object.keys(this.queryParams)[0] === 'id' ? PostId : PostSlug
      }
    }
  }
}
</script>
