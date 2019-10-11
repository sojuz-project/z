<template>
  <div v-if="attachments" :class="parseCSS(attrs)">
    <figure
      v-for="(image, i) in attachments"
      :key="i"
      class="blocks-gallery-item"
    >
      <img
        v-if="!image.sizes"
        :class="['lazyload']"
        :src="image.src"
      >
      <img
        v-else
        :data-srcset="generateSrcset(image.sizes)"
        :class="['lazyload']"
        :data-src="image.src"
      >
    </figure>
  </div>
</template>

<script>
import Attachments from '~/gql/attachments.gql'

export default {
  apollo: {
    attachments: {
      query: Attachments,
      variables() {
        return {
          ids: this.imgId
        }
      },
      update(data) {
        return (data && data.attachments && data.attachments.length > 0)
          ? data.attachments.map((attachment) => {
            return ({ ...attachment })
          })
          : []
      }
    }
  },
  props: {
    attrs: {
      type: Object,
      default: () => ({})
    },
    innerHtml: {
      type: String,
      default: () => ('')
    }
  },
  data() {
    return {
      imgId: this.attrs.ids,
      attachments: {}
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
    parseCSS: function (attrs) {
      let css = ''
      css += attrs.columns ? `columns-${attrs.columns} ` : ''
      css += attrs.imageCrop ? '' : ' is-cropped'
      return css
    }
  }
}
</script>
<style src="styleBase/core/core-gallery.css"></style>
