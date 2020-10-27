import { Box, Button, Flex } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import Head from "next/head";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React, { Fragment } from "react";
import { InputField } from "../components/input-field";
import { Wrapper } from "../components/wrapper";
import { useLoginMutation } from "../generated/graphql";
import { toErrorMap } from "../utils/to-error-map";

interface LoginProps {}

const Login: React.FC<LoginProps> = ({}) => {
  const router = useRouter();
  const [login] = useLoginMutation();

  return (
    <Fragment>
      <Head>
        <title>Login | Social News App</title>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width"
          key="viewport"
        />
        <meta
          name="description"
          content="Login to the Social News App."
          key="description"
        />
      </Head>
      <Wrapper variant="small">
        <Formik
          initialValues={{ usernameOrEmail: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login({
              variables: {
                options: values,
              },
            });
            if (response.data?.login.errors) {
              setErrors(toErrorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              if (typeof router.query.next === "string") {
                router.push(router.query.next);
              } else {
                router.push("/");
              }
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <Box mt={4}>
                <InputField
                  name="usernameOrEmail"
                  label="Username or Email"
                  placeholder="Enter Username or Email"
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
              <Flex justify="center" mb={4}>
                <Button
                  mt={4}
                  type="submit"
                  isLoading={isSubmitting}
                  variantColor="teal"
                >
                  Login
                </Button>
              </Flex>
              <div className="separator">Or,</div>
              <Flex justify="space-between" mt={4}>
                <NextLink href="/register">
                  <a>
                    <Button mt={4} variantColor="teal" variant="outline">
                      Register
                    </Button>
                  </a>
                </NextLink>

                <NextLink href="/forgot-password">
                  <a>
                    <Button mt={4} variantColor="red" variant="outline">
                      Forgot Password
                    </Button>
                  </a>
                </NextLink>
              </Flex>
            </Form>
          )}
        </Formik>
      </Wrapper>
      <style jsx>{`
        .separator {
          display: flex;
          align-items: center;
          text-align: center;
        }
        .separator::before,
        .separator::after {
          content: "";
          flex: 1;
          border-bottom: 1px solid #ccc;
        }
        .separator::before {
          margin-right: 0.5rem;
        }
        .separator::after {
          margin-left: 0.5rem;
        }
      `}</style>
    </Fragment>
  );
};

export default Login;
