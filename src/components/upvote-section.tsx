import { Flex, IconButton, Text } from "@chakra-ui/core";
import React, { useState } from "react";
import { PostSnippetFragment, useVoteMutation } from "../generated/graphql";

interface UpvoteSectionProps {
  post: PostSnippetFragment;
}

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "upvote-loading" | "downvote-loading" | "not-loading"
  >("not-loading");

  const [, vote] = useVoteMutation();
  return (
    <Flex direction="column" justifyContent="center" alignItems="center" mr={4}>
      <IconButton
        variant={post.voteStatus === 1 ? "solid" : "outline"}
        isDisabled={post.voteStatus === 1 ? true : false}
        variantColor="teal"
        style={{ opacity: 1 }}
        aria-label="Upvote Post"
        icon="chevron-up"
        mb={2}
        isLoading={loadingState === "upvote-loading"}
        onClick={async () => {
          if (post.voteStatus === 1) return;
          setLoadingState("upvote-loading");
          await vote({
            postId: post.id,
            value: 1,
          });
          setLoadingState("not-loading");
        }}
      />
      <Text>{post.points}</Text>
      <IconButton
        variant={post.voteStatus === -1 ? "solid" : "outline"}
        isDisabled={post.voteStatus === -1 ? true : false}
        variantColor="red"
        style={{ opacity: 1 }}
        aria-label="Downvote Post"
        icon="chevron-down"
        mt={2}
        isLoading={loadingState === "downvote-loading"}
        onClick={async () => {
          if (post.voteStatus === -1) return;
          setLoadingState("downvote-loading");
          await vote({
            postId: post.id,
            value: -1,
          });
          setLoadingState("not-loading");
        }}
      />
    </Flex>
  );
};
