import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { API_URL, WEBSOCKET_URL } from './urls';
import excludedRoutes from './excluded-routes';
import { onLogout } from '../utils/logout';
import { GraphQLWsLink } from '@apollo/client/link/subscriptions';
import { createClient } from 'graphql-ws';
import { getMainDefinition } from '@apollo/client/utilities';
import { Kind, OperationDefinitionNode } from 'graphql';

// Error handling link to log out user on 401 errors
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

// HTTP link for queries and mutations
const httpLink = new HttpLink({ uri: `${API_URL}/graphql` });

// WebSocket link for subscriptions
const webSocketLink = new GraphQLWsLink(
  createClient({
    url: `ws://${WEBSOCKET_URL}/graphql`,
  })
);

// Split link to use WebSocket for subscriptions and HTTP for other operations
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

// Initialize Apollo Client with combined link and in-memory cache
const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(splitLink), // Combine error handling and split links
});

export default client;
