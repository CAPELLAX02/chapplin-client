import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { API_URL, WEBSOCKET_URL } from './urls';
import excludedRoutes from './excluded-routes';
import { onLogout } from '../utils/logout';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { Kind, OperationDefinitionNode } from 'graphql';

const logoutLink = onError(({ graphQLErrors }) => {
  if (
    graphQLErrors &&
    graphQLErrors[0] &&
    (graphQLErrors[0].extensions?.originalError as any)?.statusCode === 401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      onLogout();
    }
  }
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql` });

const webSocketLink = new GraphQLWsLink(
  createClient({
    url: `ws://${WEBSOCKET_URL}/graphql`,
  })
);

const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === Kind.OPERATION_DEFINITION &&
      (definition as OperationDefinitionNode).operation === 'subscription'
    );
  },
  webSocketLink,
  httpLink
);

const client = new ApolloClient({
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          chats: {
            keyArgs: false,
            merge(existingChats, incomingChats, { args }: any) {
              const merged = existingChats ? existingChats.slice(0) : [];
              for (let i = 0; i < incomingChats.length; ++i) {
                merged[args.skip + i] = incomingChats[i];
              }
              return merged;
            },
          },
        },
      },
    },
  }),
  link: logoutLink.concat(splitLink),
});

export default client;
