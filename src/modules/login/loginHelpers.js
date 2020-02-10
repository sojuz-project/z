import Cookie from 'universal-cookie';
import { restartWebsockets } from 'vue-cli-plugin-apollo/graphql-client';

const AUTH_TOKEN_NAME = 'apollo-token';
const COOKIE_ATTRIBUTES = {};

const apolloIsLoggedMutation = (isLogged) => ({
  refetchQueries: [{ query: require('~/modules/login/isLogged.gql') }],
  mutation: require('~/modules/login/setLogged.gql'),
  variables: { isLogged },
});

export default ({ app: { apolloProvider, $updateToast }, req }, inject) => {
  const cookies = new Cookie(req && req.headers.cookie);

  inject('loginHelpers', {
    onLogin: (token, cookieAttributes = COOKIE_ATTRIBUTES, apolloClient = apolloProvider.defaultClient) => {
      // Fallback for tokenExpires param
      if (typeof cookieAttributes === 'number') {
        cookieAttributes = { expires: new Date(Date.now() + 86400 * 1000 * cookieAttributes) };
      }

      if (token) {
        cookies.set(AUTH_TOKEN_NAME, token, cookieAttributes);
        apolloClient.mutate(apolloIsLoggedMutation(true));
        $updateToast({ msg: 'Now you are logged :)', type: 'success' });
      } else {
        cookies.remove(AUTH_TOKEN_NAME, cookieAttributes);
      }

      if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
    },
    onLogout: (apolloClient = apolloProvider.defaultClient) => {
      apolloClient.mutate(apolloIsLoggedMutation(false));
      cookies.remove(AUTH_TOKEN_NAME, COOKIE_ATTRIBUTES);
      $updateToast({ msg: 'Loged out Successfully', type: 'success' });

      if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
    },
    getToken: (tokenName = AUTH_TOKEN_NAME) => cookies.get(tokenName),
  });
};
