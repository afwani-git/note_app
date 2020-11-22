import { AppProps  } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { ChakraProvider } from "@chakra-ui/react";
import { client } from '../../lib/apollo/init';


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client} >
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </ApolloProvider>
  )
}

export default MyApp
