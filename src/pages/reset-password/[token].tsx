import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Link,
} from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { NextPage } from "next";
import { withUrqlClient } from "next-urql";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useState } from "react";
import { InputField } from "../../components/input-field";
import { Wrapper } from "../../components/wrapper";
import { useResetPasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/create-urql-client";
import { toErrorMap } from "../../utils/to-error-map";

interface ResetPasswordProps {}

const ResetPassword: NextPage<ResetPasswordProps> = ({}) => {
  const router = useRouter();
  const [, resetPassword] = useResetPasswordMutation();
  const [tokenError, setTokenError] = useState("");

  return (
    <Fragment>
      <Head>
        <title>Reset Password | Social News App</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <meta
          name="description"
          content="Reset your Password. Please enter a new password."
          key="description"
        />
      </Head>
      <Wrapper variant="small">
        <Formik
          initialValues={{ newPassword: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await resetPassword({
              newPassword: values.newPassword,
              token:
                typeof router.query.token === "string"
                  ? router.query.token
                  : "",
            });
            if (response.data?.resetPassword.errors) {
              const errorMap = toErrorMap(response.data.resetPassword.errors);
              if ("token" in errorMap) {
                setTokenError(errorMap.token);
              }
              setErrors(errorMap);
            } else if (response.data?.resetPassword.user) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mt={4}>
                <InputField
                  name="newPassword"
                  label="New Password"
                  placeholder="Enter New Password"
                  type="password"
                />
              </Box>
              {tokenError ? (
                <Alert status="error" mt={4}>
                  <AlertIcon />
                  <AlertDescription>
                    <Box>{tokenError}!</Box>
                    <Box mt={2}>
                      <NextLink href="/forgot-password" passHref>
                        <Link color="teal.500" fontWeight="bold">
                          Click here to try again.
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

export default withUrqlClient(createUrqlClient)(ResetPassword);
