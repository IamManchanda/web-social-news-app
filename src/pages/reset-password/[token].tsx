import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Link,
} from "@chakra-ui/core";
import { Formik, Form } from "formik";
import { NextPage, GetServerSideProps } from "next";
import { withUrqlClient } from "next-urql";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { InputField } from "../../components/input-field";
import { Wrapper } from "../../components/wrapper";
import { useResetPasswordMutation } from "../../generated/graphql";
import { createUrqlClient } from "../../utils/create-urql-client";
import { toErrorMap } from "../../utils/to-error-map";
import NextLink from "next/link";

interface ResetPasswordProps {
  token: string;
}

const ResetPassword: NextPage<ResetPasswordProps> = ({ token }) => {
  const router = useRouter();
  const [, resetPassword] = useResetPasswordMutation();
  const [tokenError, setTokenError] = useState("");

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ newPassword: "" }}
        onSubmit={async (values, { setErrors }) => {
          const response = await resetPassword({
            newPassword: values.newPassword,
            token,
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
                <AlertTitle>{tokenError}!</AlertTitle>
                <AlertDescription>
                  please try again{" "}
                  <NextLink href="/forgot-password">
                    <Link color="teal.500" fontWeight="bold">
                      with this link.
                    </Link>
                  </NextLink>
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
  );
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  return {
    props: {
      token: params?.token as string,
    },
  };
};

export default withUrqlClient(createUrqlClient)(ResetPassword);
