<template>
  <div id="page">
    <div class="site-content">
      <section class="entry block-content-section sojuz compact">
        <HeaderTitle v-if="post && post.post_title" class="entry-title" :title="post.post_title" />
        <Thumbnail v-if="post && post.thumbnail" class="entry-thumbnail" :item="post.thumbnail" />
        <div v-if="post && post.content_excerpt" class="entry-excerpt" v-html="post.content_excerpt" />
        <div v-if="post && post.post_content" class="entry-content" v-html="post.post_content" />
        <div class="entry-meta">
          <div v-if="post && post.post_meta" class="entry-price" v-text="productMetas._price" />
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import HeaderTitle from '~/components/pagePartials/HeaderTitle';
import Thumbnail from '~/components/pagePartials/Thumbnail';
import { mapMetas } from '~/helpers/index.js';

export default {
  transition: 'smooth',
  components: {
    HeaderTitle,
    Thumbnail,
  },
  computed: {
    productMetas() {
      return mapMetas(this.post.post_meta);
    },
  },
  apollo: {
    post: {
      variables() {
        return this.$route.params;
      },
      query: require('~/gql/product.gql'),
    },
  },
};
</script>
