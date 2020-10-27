import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Link,
} from "@chakra-ui/core";
import { Form, Formik } from "formik";
import Head from "next/head";
import NextLink from "next/link";
import React, { Fragment, useState } from "react";
import { InputField } from "../components/input-field";
import { Wrapper } from "../components/wrapper";
import { useForgotPasswordMutation } from "../generated/graphql";

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [forgotPassword] = useForgotPasswordMutation();

  return (
    <Fragment>
      <Head>
        <title>Forgot Password | Social News App</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <meta
          name="description"
          content="Forgot Password? Reset your password from here."
          key="description"
        />
      </Head>
      <Wrapper variant="small">
        <Formik
          initialValues={{ email: "" }}
          onSubmit={async (values) => {
            setComplete(false);
            await forgotPassword({ variables: values });
            setComplete(true);
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mt={4}>
                <InputField
                  name="email"
                  label="Email"
                  placeholder="Enter Email"
                />
              </Box>
              {complete ? (
                <Alert status="success" mt={4}>
                  <AlertIcon />
                  <AlertDescription>
                    <Box>
                      Thanks for submitting "Reset Password" request, if there
                      is an account with a submitted email, you will get an
                      email shortly for resetting your password.
                    </Box>
                    <Box mt={2}>
                      <NextLink href="/login" passHref>
                        <Link color="teal.500" fontWeight="bold">
                          Click here to login.
                        </Link>
                      </NextLink>
                    </Box>
                  </AlertDescription>
                </Alert>
              ) : null}
              <Button
                mt={4}
                type="submit"
                isLoading={isSubmitting}
                variantColor="teal"
              >
                Reset Password
              </Button>
            </Form>
          )}
        </Formik>
      </Wrapper>
    </Fragment>
  );
};

export default ForgotPassword;
