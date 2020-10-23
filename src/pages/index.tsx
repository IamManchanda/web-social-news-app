import { Box, Button, Flex, Heading, Link, Stack, Text } from "@chakra-ui/core";
import { withUrqlClient } from "next-urql";
import NextLink from "next/link";
import React, { useState } from "react";
import { EditDeletePostButtons } from "../components/edit-delete-post-buttons";
import { LayoutWrapper } from "../components/layout-wrapper";
import { UpvoteSection } from "../components/upvote-section";
import { textSnippetLimit } from "../constants/text-snippet-limit";
import { usePostsQuery } from "../generated/graphql";
import { createUrqlClient } from "../utils/create-urql-client";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
    snippetLimit: textSnippetLimit,
  });

  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return (
      <LayoutWrapper>
        <div>
          There are no posts available. May be{" "}
          <NextLink href="/create-post" passHref>
            <Link color="teal.500" fontWeight="bold">
              Create one?
            </Link>
          </NextLink>
        </div>
      </LayoutWrapper>
    );
  }

  return (
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
      {!data && fetching ? (
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
            onClick={() =>
              setVariables({
                ...variables,
                cursor: data.posts.posts[data.posts.posts.length - 1].createdAt,
              })
            }
            variantColor="teal"
            my={12}
          >
            Load More
          </Button>
        </Flex>
      ) : null}
    </LayoutWrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
