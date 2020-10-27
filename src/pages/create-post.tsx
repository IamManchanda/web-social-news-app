import { Box, Button, Heading } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { BackToHomepage } from "../components/back-to-homepage";
import { InputField } from "../components/input-field";
import { LayoutWrapper } from "../components/layout-wrapper";
import { useCreatePostMutation } from "../generated/graphql";
import { useIsAuth } from "../utils/use-is-auth";
import { withApollo } from "../utils/with-apollo";

interface CreatePostProps {}

const CreatePost: React.FC<CreatePostProps> = ({}) => {
  const router = useRouter();
  useIsAuth();
  const [createPost] = useCreatePostMutation();
  return (
    <Fragment>
      <Head>
        <title>Create a Post | Social News App</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <meta
          name="description"
          content="Create a Post by submitting your content from here."
          key="description"
        />
      </Head>
      <LayoutWrapper>
        <BackToHomepage />
        <Formik
          initialValues={{ title: "", text: "" }}
          onSubmit={async (values) => {
            const { errors } = await createPost({
              variables: {
                options: values,
              },
              update: (cache) => {
                cache.evict({
                  fieldName: "posts:{}",
                });
              },
            });
            if (!errors) {
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
    </Fragment>
  );
};

export default withApollo({ ssr: false })(CreatePost);
