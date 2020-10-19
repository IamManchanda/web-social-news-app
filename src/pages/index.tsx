import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/create-urql-client";
import { usePostsQuery } from "../generated/graphql";
import { LayoutWrapper } from "../components/layout-wrapper";
import { Box, Heading, Link, Stack, Text, Flex, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import React from "react";

const Index = () => {
  const [{ data, fetching }] = usePostsQuery({
    variables: {
      limit: 10,
      snippetLimit: 160,
    },
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
          {data!.posts.map((p) => (
            <Box key={p.id} p={5} shadow="md" borderWidth="1px">
              <Heading fontSize="xl">{p.title}</Heading>
              <Text mt={4}>{p.textSnippet}</Text>
            </Box>
          ))}
        </Stack>
      )}
      <Flex justify="center">
        <Button variantColor="teal" my={12}>
          Load More
        </Button>
      </Flex>
    </LayoutWrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
