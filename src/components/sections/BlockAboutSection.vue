<template>
  <div>
    <div class="image">
      <img :src="attrs.thumbImage.sizes.full.url" />
    </div>
    <div v-scroll-reveal.reset="{ distance: '20px' }" class="title">
      {{ attrs.title }}
    </div>
    <div
      class="back"
      @click="$router.go(-1)"
    >Back</div>
    <div class="subtitle">Subtitle</div>
    <div class="excerpt">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</div>
    <div class="content">Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</div>
    <div v-if="iteration===0" class="first-footer">
      <img src="~/assets/Scroll-icon.svg" alt="scroll">
    </div>
  </div>
</template>

<script>
export default {
  components: {
    // BlockHeroSection
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
