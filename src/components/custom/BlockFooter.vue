<template>
  <div v-if="blocksFooter && blocksFooter.blocks">
    <inner-block v-for="block in blocksFooter.blocks" :key="block.blockName" :blocks="block" />
  </div>
</template>

<script>
import gql from 'graphql-tag';
export default {
  name: 'FooterBlock',
  apollo: {
    blocksFooter: {
      query() {
        const rawQuery = `query(
          $first_footer: String = "footer",
          ){
          nqf1:queryPost(post_name:$first_footer){
            id: ID
            blocks
          }
        }`;
        return gql`
          ${rawQuery}
        `;
      },
      update(data) {
        return data.nqf1;
      },
    },
  },
};
</script>
