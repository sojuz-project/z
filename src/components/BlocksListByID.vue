<template>
  <div>
    <div
      :is="block.blockName.substr(4)"
      v-for="(block, i) in filteredPost"
      :id="`section-${i}`"
      :key="i"
      v-scroll-reveal.resett="{ opacity: 0 }"
      :style="{
        'visibility': 'hidden',
        'background-color': block.attrs.backgroundColor,
        'color': block.attrs.textColor
      }"
      :attrs="block.attrs"
      :iteration="i"
      :class="['entry', block.blockName.substr(4)]"
    />
  </div>
</template>
<script>
import Post from '~/gql/blocksById.gql'
import BlockHeroSection from '~/components/sections/BlockHeroSection'
import BlockAdvantagesSection from '~/components/sections/BlockAdvantagesSection'
import BlockPropertiesSection from '~/components/sections/BlockPropertiesSection'
import BlockAboutSection from '~/components/sections/BlockAboutSection'

export default {
  components: {
    BlockHeroSection,
    BlockAdvantagesSection,
    BlockPropertiesSection,
    BlockAboutSection
  },
  props: {
    id: {
      type: Number,
      default: 0
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
        return {
          id: this.id
        }
      },
      query: Post
    }
  }
}
</script>
