import React from "react";
import NextLink from "next/link";
import { Box, IconButton } from "@chakra-ui/core";
import { useRouter } from "next/router";
import { useDeletePostMutation, useMeQuery } from "../generated/graphql";
import { isServer } from "../utils/is-server";
import { UrlObject } from "url";

declare type Url = string | UrlObject;

interface EditDeletePostButtonsProps {
  id: number;
  creatorId: number;
}

export const EditDeletePostButtons: React.FC<EditDeletePostButtonsProps> = ({
  id,
  creatorId,
}) => {
  const router = useRouter();
  const [, deletePost] = useDeletePostMutation();

  const [{ data: meData }] = useMeQuery({
    pause: isServer(),
  });

  if (meData?.me?.id !== creatorId) return null;

  return (
    <Box>
      <NextLink
        href={`/post/edit/[id]?next=${router.asPath}`}
        as={`/post/edit/${id}?next=${router.asPath}`}
      >
        <a>
          <IconButton
            mr={4}
            variant="outline"
            variantColor="teal"
            icon="edit"
            aria-label="Edit Post"
          />
        </a>
      </NextLink>
      <IconButton
        variant="outline"
        variantColor="red"
        icon="delete"
        aria-label="Delete Post"
        onClick={() => {
          deletePost({ id });
        }}
      />
    </Box>
  );
};
