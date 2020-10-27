import { ApolloClient, InMemoryCache } from "@apollo/client";
import { withApollo as createWithApollo } from "next-apollo";
import { PaginatedPostsResponse } from "../generated/graphql";

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

export const withApollo = createWithApollo(client);
