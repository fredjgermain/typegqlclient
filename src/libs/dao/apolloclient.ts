import { 
  ApolloClient, 
  InMemoryCache, 
} from "@apollo/client";

const REMOTE_PORT = 8000;

export const client = new ApolloClient({
  //uri: `http://localhost:${REMOTE_PORT}/graphql`, 
  uri: `https://fjg-demo-backend.herokuapp.com/graphql`, 

  //uri: 'https://48p1r2roz4.sse.codesandbox.io/',
  cache: new InMemoryCache()
});
