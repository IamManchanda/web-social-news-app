import { CSSReset, ThemeProvider } from "@chakra-ui/core";
import theme from "../theme";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";
import { PaginatedPostsResponse } from "../generated/graphql";

const MyApp = ({ Component, pageProps }: any) => {
  const { NEXT_PUBLIC_API_BACKEND_URL } = process.env;
  const client = new ApolloClient({
    uri: NEXT_PUBLIC_API_BACKEND_URL as string,
    credentials: "include",
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            posts: {
              keyArgs: [],
              merge(
                existing: PaginatedPostsResponse | undefined,
                incoming: PaginatedPostsResponse,
              ): PaginatedPostsResponse {
                return {
                  ...incoming,
                  posts: [...(existing?.posts || []), ...incoming.posts],
                };
              },
            },
          },
        },
      },
    }),
  });

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </ApolloProvider>
  );
};

export default MyApp;
