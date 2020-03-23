<template>
  <div :class="[blockAttrs.className]" :style="blockAttrs.style">
    <div class="pad-L-h pad-L-v">
      <nuxt-link :to="`/products/filter/${blockAttrs.categories.slug}`">{{ blockAttrs.categories.name }}</nuxt-link>
    </div>
    <h1 class="pad-L-h">{{ blockAttrs.post_title }}</h1>
    <inner-block
      :blocks="{
        blockName: 'ResponsiveImg',
        attrs: { ...blockAttrs.thumbnail, rsize: '100vw', className: '', showBg: true },
      }"
    />
    <inner-block
      :blocks="{
        blockName: 'coregallery',
        attrs: {
          ids: blockAttrs.post_meta && blockAttrs.post_meta._product_image_gallery,
          columns: 3,
          className: 'gallery-gap-2 pad-0-5',
        },
      }"
    />
    <br />
    <inner-block
      :blocks="{
        blockName: 'MetaList',
        attrs: {
          metas: blockAttrs.post_meta,
          meta: '_product_attributes',
          className: 'flex pad-L-v pad-L-h nav-bd-top nav-bd-bottom',
        },
      }"
    />
    <br />
    <inner-block
      :blocks="{
        blockName: 'cgbblockwrapper',
        attrs: { className: 'single-actions nav-v-list closed ', tagName: 'section' },
        innerBlocks: [
          {
            blockName: 'MetaList',
            attrs: {
              prefix: '$',
              metas: blockAttrs.post_meta,
              meta: '_price',
              className: '',
            },
          },
          {
            blockName: 'AddToCart',
            attrs: {
              className: '',
              id: blockAttrs.id,
            },
          },
          {
            blockName: 'Bookmark',
            blockAttrs: {
              id: blockAttrs.id,
              className: '',
              iconAttrs: { weight: 1, fill: '#fff', fillOpacity: 0.5 },
            },
          },
          {
            blockName: 'Like',
            attrs: {
              id: blockAttrs.id,
              className: '',
            },
          },
          {
            blockName: 'NavLink',
            attrs: {
              label: '#',
            },
          },
        ],
      }"
    />

    <inner-block
      :blocks="{
        blockName: 'coreparagraph',
        innerHTML: blockAttrs.post_content,
        blockAttrs: { className: 'pad-L-h' },
      }"
    />

    <inner-block
      :blocks="{
        attrs: {
          className: 'flex  pad-XL-v pad-L-h',
        },
        blockName: 'SocialShare',
      }"
    />
  </div>
</template>
<script>
export default {
  props: {
    blockAttrs: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>
<style scope>
.single-actions {
  position: fixed;
  right: 0;
  bottom: 5vh;
  z-index: 50;
}
.single-actions .block {
  position: relative;
}
.single-actions .inner-wrapper {
  padding: 30px;
  text-align: center;
}

.likes-count {
  position: absolute;
  right: 10px;
  bottom: 10px;
  font-size: 12px;
}
.meta-prefix {
  font-size: 12px;
  position: absolute;
  top: 10px;
  left: 10px;
}
</style>
