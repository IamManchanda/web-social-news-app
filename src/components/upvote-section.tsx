import { ApolloCache } from "@apollo/client";
import { Flex, IconButton, Text } from "@chakra-ui/core";
import gql from "graphql-tag";
import React, { useState } from "react";
import {
  PostSnippetFragment,
  useVoteMutation,
  VoteMutation,
} from "../generated/graphql";

interface UpvoteSectionProps {
  post: PostSnippetFragment;
}

const updateAfterVote = (
  value: number,
  postId: number,
  cache: ApolloCache<VoteMutation>,
) => {
  const data = cache.readFragment<{
    id: number;
    points: number;
    voteStatus: number | null;
  }>({
    id: `Post:${postId}`,
    fragment: gql`
      fragment _RF on Post {
        id
        points
        voteStatus
      }
    `,
  });
  if (data) {
    if (data.voteStatus === value) return;

    const newPoints =
      (data.points as number) + (!data.voteStatus ? 1 : 2) * value;
    cache.writeFragment({
      id: `Post:${postId}`,
      fragment: gql`
        fragment _WF on Post {
          points
          voteStatus
        }
      `,
      data: {
        points: newPoints,
        voteStatus: value,
      },
    });
  }
};

export const UpvoteSection: React.FC<UpvoteSectionProps> = ({ post }) => {
  const [loadingState, setLoadingState] = useState<
    "upvote-loading" | "downvote-loading" | "not-loading"
  >("not-loading");

  const [vote] = useVoteMutation();
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
            variables: {
              postId: post.id,
              value: 1,
            },
            update: (cache) => updateAfterVote(1, post.id, cache),
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
            variables: {
              postId: post.id,
              value: -1,
            },
            update: (cache) => updateAfterVote(-1, post.id, cache),
          });
          setLoadingState("not-loading");
        }}
      />
    </Flex>
  );
};
