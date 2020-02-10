export default ({ app: { apolloProvider } }, inject) => {
  inject('updateToast', (message) => {
    const toast = JSON.stringify(message);

    apolloProvider.defaultClient.mutate({
      mutation: require('~/modules/toast/updateToast'),
      variables: { toast },
    });
  });
};
