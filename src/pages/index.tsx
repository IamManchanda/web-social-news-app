import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core";
import NextLink from "next/link";
import React, { Fragment } from "react";
import Head from "next/head";
import { EditDeletePostButtons } from "../components/edit-delete-post-buttons";
import { LayoutWrapper } from "../components/layout-wrapper";
import { UpvoteSection } from "../components/upvote-section";
import { textSnippetLimit } from "../constants/text-snippet-limit";
import { usePostsQuery } from "../generated/graphql";

const Index = () => {
  const { data, error, loading, fetchMore, variables } = usePostsQuery({
    variables: {
      limit: 10,
      snippetLimit: textSnippetLimit,
      cursor: null as null | string,
    },
    notifyOnNetworkStatusChange: true,
  });

  return (
    <Fragment>
      <Head>
        <title>Welcome | Social News App</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <meta
          name="description"
          content="Welcome to the Social News App."
          key="description"
        />
      </Head>
      {!loading && !data ? (
        <LayoutWrapper>
          <div>Query Failed!</div>
          <div>{error?.message}</div>
        </LayoutWrapper>
      ) : (
        <LayoutWrapper>
          <Flex align="center" justify="space-between">
            <Heading>All Posts</Heading>
            <NextLink href="/create-post">
              <a>
                <Button variantColor="teal">Create Post</Button>
              </a>
            </NextLink>
          </Flex>
          <br />
          {!data && loading ? (
            <div>loading...</div>
          ) : (
            <Stack spacing={8}>
              {data!.posts.posts.map((p) =>
                !p ? null : (
                  <Flex
                    key={p.id}
                    p={5}
                    shadow="md"
                    borderWidth="1px"
                    borderRadius="8px"
                  >
                    <UpvoteSection post={p} />
                    <Box ml={4} flex={1}>
                      <NextLink href="/post/[id]" as={`/post/${p.id}`} passHref>
                        <Link color="teal.500" fontWeight="bold">
                          <Heading fontSize="xl">{p.title}</Heading>
                        </Link>
                      </NextLink>
                      <Text mt={2}>Posted by: @{p.creator.username}</Text>
                      <Flex mt={6} align="center">
                        <Text flex={1} mr={4}>
                          {p.textSnippet}
                        </Text>
                        <Box ml="auto">
                          <EditDeletePostButtons
                            id={p.id}
                            creatorId={p.creator.id}
                          />
                        </Box>
                      </Flex>
                    </Box>
                  </Flex>
                ),
              )}
            </Stack>
          )}
          {data && data.posts.hasMore ? (
            <Flex justify="center">
              <Button
                onClick={() => {
                  fetchMore({
                    variables: {
                      limit: variables?.limit,
                      snippetLimit: variables?.snippetLimit,
                      cursor:
                        data.posts.posts[data.posts.posts.length - 1].createdAt,
                    },
                  });
                }}
                isLoading={loading}
                variantColor="teal"
                my={12}
              >
                Load More
              </Button>
            </Flex>
          ) : null}
        </LayoutWrapper>
      )}
    </Fragment>
  );
};

export default Index;
