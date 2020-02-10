import gql from 'graphql-tag';
import Cookie from 'universal-cookie';
const AUTH_TOKEN = 'apollo-token';

const typeDefs = gql`
  type Query {
    toastMessage: String!
    isLogged: Boolean!
  }

  type Mutation {
    updateToastMessage(toast: String!): String!
    setLogged(isLogged: Boolean!): Boolean!
  }
`;

const resolvers = {
  Mutation: {
    updateToastMessage: (root, { toast }, { cache }) => {
      cache.writeData({ data: { toastMessage: toast } });
      return toast;
    },
    setLogged: (root, { isLogged }, { cache }) => {
      cache.writeData({ data: { isLogged } });
      return isLogged;
    },
  },
};

function getCookie(name) {
  const v = document.cookie.match(`(^|;) ?${name}=([^;]*)(;|$)`);
  return v ? v[2] : null;
}

export default function(ctx) {
  let isLogged = false;

  if (process.client) {
    isLogged = process.client && !!getCookie(AUTH_TOKEN);
  } else {
    const cookies = new Cookie(ctx.req && ctx.req.headers.cookie);
    isLogged = !!cookies.get(AUTH_TOKEN);
  }

  return {
    httpEndpoint: process.env.GRAPH_URL,
    wsEndpoint: process.env.SOCKET_URL,
    resolvers,
    typeDefs,
    onCacheInit: (cache) => {
      const data = {
        toastMessage: '{}',
        isLogged,
      };
      cache.writeData({ data });
    },
  };
}
