import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { createUrqlClient } from "../../utils/create-urql-client";
import { usePostQuery } from "../../generated/graphql";
import { LayoutWrapper } from "../../components/layout-wrapper";
import { Heading, Text, Box } from "@chakra-ui/core";
import { BackToHomepage } from "../../components/back-to-homepage";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const router = useRouter();
  const queryId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, error, fetching }] = usePostQuery({
    pause: queryId === -1,
    variables: {
      id: queryId,
    },
  });

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
        <Text mt={6}>{data.post.text}</Text>
      </Box>
    </LayoutWrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Post);
