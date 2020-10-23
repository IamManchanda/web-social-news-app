import { Box, Button, Heading } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React from "react";
import { BackToHomepage } from "../components/back-to-homepage";
import { InputField } from "../components/input-field";
import { LayoutWrapper } from "../components/layout-wrapper";
import { useCreatePostMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/create-urql-client";
import { useIsAuth } from "../utils/use-is-auth";

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [, createPost] = useCreatePostMutation();
  return (
    <LayoutWrapper>
      <BackToHomepage />
      <Formik
        initialValues={{ title: "", text: "" }}
        onSubmit={async (values) => {
          const { error } = await createPost({ options: values });
          if (!error) {
            router.push("/");
          }
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <Box p={5} shadow="md" borderWidth="1px" borderRadius="8px">
              <Heading>Create a Post!</Heading>
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
                Create Post
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </LayoutWrapper>
  );
};

export default withUrqlClient(createUrqlClient)(CreatePost);
