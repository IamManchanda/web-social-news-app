import { Box, Button } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { InputField } from "../components/input-field";
import { Wrapper } from "../components/wrapper";
import { useRegisterMutation } from "../generated/graphql";
import { createUrqlClient } from "../utils/create-urql-client";
import { toErrorMap } from "../utils/to-error-map";

interface RegisterProps {}

const Register: React.FC<RegisterProps> = ({}) => {
  const router = useRouter();
  const [, register] = useRegisterMutation();

  return (
    <Fragment>
      <Head>
        <title>Register | Social News App</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <meta
          name="description"
          content="Register for a Social News App account."
          key="description"
        />
      </Head>
      <Wrapper variant="small">
        <Formik
          initialValues={{ username: "", email: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await register({ options: values });
            if (response.data?.register.errors) {
              setErrors(toErrorMap(response.data.register.errors));
            } else if (response.data?.register.user) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mt={4}>
                <InputField
                  name="username"
                  label="Username"
                  placeholder="Enter Username"
                />
              </Box>
              <Box mt={4}>
                <InputField
                  name="email"
                  label="Email"
                  placeholder="Enter Email"
                />
              </Box>
              <Box mt={4}>
                <InputField
                  name="password"
                  label="Password"
                  placeholder="Enter Password"
                  type="password"
                />
              </Box>
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                variantColor="teal"
              >
                Register
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Fragment>
  );
};

export default withUrqlClient(createUrqlClient)(Register);
