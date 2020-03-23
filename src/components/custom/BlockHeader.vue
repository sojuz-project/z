<template>
  <div v-if="blocksHeader && blocksHeader.blocks">
    <inner-block v-for="block in blocksHeader.blocks" :key="block.blockName" :blocks="block" />
  </div>
</template>

<script>
import gql from 'graphql-tag';
export default {
  name: 'HeaderBlock',
  apollo: {
    blocksHeader: {
      query() {
        const rawQuery = `query(
          $first_header: String = "header",
          $second_header: String = "header-${this.$route.params.slug}"
          ){
          nqh1:queryPost(post_name:$first_header){
            id: ID
            blocks
          }
          nqh2:queryPost(post_name:$second_header){
            id: ID
            blocks
          }
        }`;
        return gql`
          ${rawQuery}
        `;
      },
      update(data) {
        return data.nqh2 || data.nqh1;
      },
    },
  },
};
</script>
