import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/create-urql-client";
import { usePostsQuery } from "../generated/graphql";
import { LayoutWrapper } from "../components/layout-wrapper";
import { Box, Heading, Link, Stack, Text, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import React, { useState } from "react";

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
            <Box key={p.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
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
