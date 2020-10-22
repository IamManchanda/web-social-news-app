import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/create-urql-client";
import { usePostsQuery } from "../generated/graphql";
import { LayoutWrapper } from "../components/layout-wrapper";
import { Box, Heading, Link, Stack, Text, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import React, { useState } from "react";
import { UpvoteSection } from "../components/upvote-section";

const Index = () => {
  const [variables, setVariables] = useState({
    limit: 10,
    cursor: null as null | string,
    snippetLimit: 175,
  });

  const [{ data, fetching }] = usePostsQuery({
    variables,
  });

  if (!fetching && !data) {
    return (
      <div>
        There are no posts available. May{" "}
        <NextLink href="/create-post" passHref>
          <Link color="teal.500" fontWeight="bold">
            Create one?
          </Link>
        </NextLink>
      </div>
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
          {data!.posts.posts.map((p) => (
            <Flex
              key={p.id}
              p={5}
              shadow="md"
              borderWidth="1px"
              justify="space-between"
            >
              <Box pr={6}>
                <Heading fontSize="xl">{p.title}</Heading>
                <Text mt={2}>Posted by: @{p.creator.username}</Text>
                <Text mt={6}>{p.textSnippet}</Text>
              </Box>
              <UpvoteSection post={p} />
            </Flex>
          ))}
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
