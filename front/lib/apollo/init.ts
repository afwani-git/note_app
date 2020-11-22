import { InMemoryCache, ApolloClient } from "@apollo/client"
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: "http://localhost:8080/v1/graphql",
});

