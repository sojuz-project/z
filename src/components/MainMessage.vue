<template>
  <div v-if="data.msg" v-on:click="close()" :class="['main-message', 'has-ultrasmall-font-size', data.type]">
    <p>{{ data.msg }}</p>
    <IcoClose :attrs="{weight:600}"  class="close" />
  </div>
</template>
<script>
import gql from 'graphql-tag';


export default {
  components: {
    IcoClose: () => import('~/components/icons/Close'),
  },
  data: function() {
    return {
      data: {},
    };
  },
  methods: {
    close: function () {
      this.updateMessage({ msg: false });
    }
  },
  apollo: {
    key: {
      query() {
        return gql`
          query {
            hello @client
          }
        `;
      },
      update({ hello }) {
        this.data = JSON.parse(hello);
      },
    },
  },
};
</script>
