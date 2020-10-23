import { Box, Button, Heading } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import React from "react";
import { BackToHomepage } from "../../../components/back-to-homepage";
import { InputField } from "../../../components/input-field";
import { LayoutWrapper } from "../../../components/layout-wrapper";
import {
  usePostQuery,
  useUpdatePostMutation,
} from "../../../generated/graphql";
import { createUrqlClient } from "../../../utils/create-urql-client";
import { useGetQueryIdInt } from "../../../utils/use-get-query-id-int";
import { textSnippetLimit } from "../../../constants/text-snippet-limit";
import { useRouter } from "next/router";

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
  );
};

export default withUrqlClient(createUrqlClient)(EditPost);
