import { Flex, IconButton, Text } from "@chakra-ui/core";
import React from "react";
import { PostSnippetFragment } from "../generated/graphql";

interface UpvoteSectionProps {
  post: PostSnippetFragment;
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        variant="outline"
        variantColor="teal"
        aria-label="Upvote Post"
        icon="chevron-up"
        mb={2}
        onClick={() => {
          console.log("Upvote Post");
        }}
      />
      <Text>{post.points}</Text>
      <IconButton
        variant="outline"
        variantColor="teal"
        aria-label="Downvote Post"
        icon="chevron-down"
        mt={2}
        onClick={() => {
          console.log("Downvote Post");
        }}
      />
    </Flex>
  );
};
