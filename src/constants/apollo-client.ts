import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { API_URL } from './urls';
import excludedRoutes from './excluded-routes';
import router from '../components/Routes';

const logoutLink = onError(({ graphQLErrors }) => {
  if (
    graphQLErrors &&
    graphQLErrors[0] &&
    (graphQLErrors[0].extensions?.originalError as any)?.statusCode === 401
  ) {
    if (!excludedRoutes.includes(window.location.pathname)) {
      router.navigate('/login');
      client.clearStore(); // veya client.resetStore();
    }
  }
});

const httpLink = new HttpLink({ uri: `${API_URL}/graphql` });

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: logoutLink.concat(httpLink),
});

export default client;
