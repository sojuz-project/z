import Vue from 'vue';
import gql from 'graphql-tag';

Vue.mixin({
  methods: {
    parseGutenClass(attrs) {
      return 'exampleclass';
    },
    // Update MEssage
    updateMessage(message) {
      const transport = JSON.stringify(message);
      this.$apollo.mutate({
        mutation: gql`
          mutation updateHello($value: String!) {
            updateHello(value: $value) @client
          }
        `,
        variables: {
          value: transport,
        },
      });
    },
  },
});
