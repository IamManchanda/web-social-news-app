import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createWithApollo } from "./create-with-apollo";
import { PaginatedPostsResponse } from "../generated/graphql";
import { NextPageContext } from "next";

const { NEXT_PUBLIC_API_BACKEND_URL } = process.env;
const createClient = (ctx: NextPageContext) =>
  new ApolloClient({
    uri: NEXT_PUBLIC_API_BACKEND_URL as string,
    credentials: "include",
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
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

export const withApollo = createWithApollo(createClient);
