<template>
  <div class="container"></div>
</template>

<script>
import Vue from 'vue';
const formData = Vue.observable({});
export default {
  transition: 'smooth',
  name: 'LoginPage',
  middleware: 'isAuth',
  provide() {
    return {
      formData: formData,
    };
  },
  data() {
    return {
      loading: false,
      blocks: [
        {
          blockName: 'cgbblockwrapper',
          attrs: { className: 'flex f-childs-100', tagName: 'div' },
          innerBlocks: [
            {
              blockName: 'custominput',
              attrs: { fieldName: 'first_name', label: 'First name', required: 'true', className: 'f-self-2' },
            },
          ],
        },
      ],
    };
  },
  methods: {
    submit() {
      // console.log('submit');
    },
  },
};
</script>
<style src="~/css/core/core-button.css"></style>
<style src="~/css/custom-blocks/custom-form.css"></style>
