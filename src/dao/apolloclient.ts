import { 
  ApolloClient, 
  InMemoryCache, 
  DefaultOptions
} from "@apollo/client";

const REMOTE_PORT = 8000;

export const client = new ApolloClient({
  //uri: `http://localhost:${REMOTE_PORT}/graphql`, 
  uri: `https://fjg-demo-backend.herokuapp.com/graphql`, 
  defaultOptions: { 
    query: { 
      fetchPolicy: "network-only", 
      notifyOnNetworkStatusChange:true, 
    } 
  } as DefaultOptions, 
  //uri: 'https://48p1r2roz4.sse.codesandbox.io/',
  cache: new InMemoryCache()
});
