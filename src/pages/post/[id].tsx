import React, { Fragment } from "react";
import Head from "next/head";
import { LayoutWrapper } from "../../components/layout-wrapper";
import { Heading, Text, Box, Flex } from "@chakra-ui/core";
import { BackToHomepage } from "../../components/back-to-homepage";
import { useGetPostFromUrl } from "../../utils/use-get-post-from-url";
import { EditDeletePostButtons } from "../../components/edit-delete-post-buttons";

interface PostProps {}

const Post: React.FC<PostProps> = ({}) => {
  const { data, error, loading } = useGetPostFromUrl();

  return (
    <Fragment>
      <Head>
        <title>{data?.post?.title} | Social News App</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <meta
          name="description"
          content={data?.post?.title}
          key="description"
        />
      </Head>
      {loading ? (
        <LayoutWrapper>
          <div>loading...</div>
        </LayoutWrapper>
      ) : error ? (
        <div>{error.message}</div>
      ) : !data?.post ? (
        <LayoutWrapper>
          <Box>
            <Heading>Could not find the Post!</Heading>
          </Box>
        </LayoutWrapper>
      ) : (
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
      )}
    </Fragment>
  );
};

export default Post;
