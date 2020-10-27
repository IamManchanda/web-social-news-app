import { Box, Button, Heading } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { BackToHomepage } from "../../../components/back-to-homepage";
import { InputField } from "../../../components/input-field";
import { LayoutWrapper } from "../../../components/layout-wrapper";
import { textSnippetLimit } from "../../../constants/text-snippet-limit";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/create-urql-client";
import { useGetQueryIdInt } from "../../../utils/use-get-query-id-int";

interface EditPostProps {}

const EditPost: React.FC<EditPostProps> = ({}) => {
  const router = useRouter();
  const queryIdInt = useGetQueryIdInt();
  const [{ data, error, fetching }] = usePostQuery({
    pause: queryIdInt === -1,
    variables: {
      id: queryIdInt,
    },
  });
  const [, updatePost] = useUpdatePostMutation();

  return (
    <Fragment>
      <Head>
        <title>Edit a Post | Social News App</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <meta
          name="description"
          content="Edit a Post by submitting your updated content from here."
          key="description"
        />
      </Head>
      {fetching ? (
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
          <Formik
            initialValues={{ title: data.post.title, text: data.post.text }}
            onSubmit={async (values) => {
              await updatePost({
                id: queryIdInt,
                snippetLimit: textSnippetLimit,
                ...values,
              });
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
              } else {
                router.push("/");
              }
            }}
          >
            {({ isSubmitting }) => (
              <Form>
                <Box p={5} shadow="md" borderWidth="1px" borderRadius="8px">
                  <Heading>Edit a Post!</Heading>
                  <Box mt={4}>
                    <InputField
                      name="title"
                      label="Title"
                      placeholder="Enter Title"
                    />
                  </Box>
                  <Box mt={4}>
                    <InputField
                      textarea
                      name="text"
                      label="Text"
                      placeholder="Enter Text content"
                    />
                  </Box>
                  <Button
                    mt={4}
                    type="submit"
                    isLoading={isSubmitting}
                    variantColor="teal"
                  >
                    Update Post
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </LayoutWrapper>
      )}
    </Fragment>
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
