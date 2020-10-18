import {
  Alert,
  AlertDescription,
  AlertIcon,
  Box,
  Button,
  Link,
} from "@chakra-ui/core";
import { Formik, Form } from "formik";
import React, { useState } from "react";
import { InputField } from "../components/input-field";
import { Wrapper } from "../components/wrapper";
import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/create-urql-client";
import { useForgotPasswordMutation } from "../generated/graphql";
import NextLink from "next/link";

interface ForgotPasswordProps {}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({}) => {
  const [complete, setComplete] = useState(false);
  const [, forgotPassword] = useForgotPasswordMutation();

  return (
    <Wrapper variant="small">
      <Formik
        initialValues={{ email: "" }}
        onSubmit={async (values) => {
          setComplete(false);
          await forgotPassword(values);
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
                    Thanks for submitting "Reset Password" request, if there is
                    an account with a submitted email, you will get an email
                    shortly for resetting your password.
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
  );
};

export default withUrqlClient(createUrqlClient)(ForgotPassword);
