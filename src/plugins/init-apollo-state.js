const resolvers = {
  Mutation: {
    updateHello: (root, { value }, { cache }) => {
      const data = {
        hello: value,
      };
      cache.writeData({ data });
      return data;
    },
  },
};

const clientState = {
  // Set default values for local state.
  defaults: {
    hello: '{}',
  },
  resolvers,
};

export default function(context) {
  return {
    httpEndpoint: process.env.GRAPH_URL,
    wsEndpoint: process.env.SOCKET_URL,
    clientState,
    // ssrMode: true,
  };
}
