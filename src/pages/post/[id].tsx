import { withUrqlClient } from "next-urql";
import React from "react";
import { createUrqlClient } from "../../utils/create-urql-client";
import { LayoutWrapper } from "../../components/layout-wrapper";
import { Heading, Text, Box, Flex } from "@chakra-ui/core";
import { BackToHomepage } from "../../components/back-to-homepage";
import { useGetPostFromUrl } from "../../utils/use-get-post-from-url";
import { EditDeletePostButtons } from "../../components/edit-delete-post-buttons";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const [{ data, error, fetching }] = useGetPostFromUrl();

  if (fetching) {
    return (
      <LayoutWrapper>
        <div>loading...</div>
      </LayoutWrapper>
    );
  }

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.post) {
    return (
      <LayoutWrapper>
        <Box>
          <Heading>Could not find the Post!</Heading>
        </Box>
      </LayoutWrapper>
    );
  }

  return (
    <LayoutWrapper>
      <BackToHomepage />
      <Box p={5} shadow="md" borderWidth="1px" borderRadius="8px">
        <Heading>{data.post.title}</Heading>
        <Text mt={2}>Posted by: @{data.post.creator.username}</Text>
        <Flex mt={6} align="center">
          <Text flex={1} mr={4}>
            {data.post.text}
          </Text>
          <Box ml="auto">
            <EditDeletePostButtons
              id={data.post.id}
              creatorId={data.post.creator.id}
            />
          </Box>
        </Flex>
      </Box>
    </LayoutWrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
