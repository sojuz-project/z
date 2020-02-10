<template>
  <div>
    <h2>Email notyfications</h2>
    <form>
      <inner-block v-for="(block, i) in blocks" :key="i" :blocks="block" />
      <div class="button wp-block-button aligncenter">
        <button :disabled="loading" class="wp-block-button__link" type="submit">
          Save changes
        </button>
      </div>
    </form>
  </div>
</template>
<script>
// import Options from '~/gql/options.gql';
import BillingForm from '~/components/forms/billing.vue';
export default {
  provide() {
    return {
      formData: this.data,
    };
  },
  components: {},
  data() {
    return {
      data: [{ id: '111', value: true }],
      blocks: [
        {
          blockName: 'cgbblockwrapper',
          attrs: { className: 'flex f-childs-100', tagName: 'div' },
          innerBlocks: [
            {
              blockName: 'customcheckbox',
              attrs: {
                fieldName: '111',
                label: 'New products in our shop - get our newest content weakly',
                required: 'true',
              },
            },
            {
              blockName: 'customcheckbox',
              attrs: {
                fieldName: '112',
                label: 'Creatsy newsletter - get freakqent Creatsy updates',
                required: 'true',
              },
            },
            {
              blockName: 'customcheckbox',
              attrs: {
                fieldName: '113',
                label: 'Special offers - Special offers from Creatsy',
                required: 'true',
              },
            },
            {
              blockName: 'customcheckbox',
              attrs: {
                fieldName: '114',
                label: 'Item update notyfications',
                required: 'true',
              },
            },
          ],
        },
      ],
    };
  },
  computed: {
    items() {
      return this.bookmarks && this.bookmarks.filter(Boolean);
    },
  },
};
</script>
<style></style>
