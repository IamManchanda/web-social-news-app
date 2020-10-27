import React from "react";
import { Box, Flex, Link, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Fragment } from "react";
import { isServer } from "../utils/is-server";
import { useRouter } from "next/router";
import { useApolloClient } from "@apollo/client";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const router = useRouter();
  const [logout, { loading: logoutLoading }] = useLogoutMutation();
  const apolloClient = useApolloClient();
  const { data, loading } = useMeQuery({
    skip: isServer(),
  });
  let body = null;

  if (loading || !data) {
    body = null;
  } else if (!data?.me) {
    body = (
      <Fragment>
        <NextLink href="/login" passHref>
          <Link color="white" mr={4} fontWeight="bold">
            Login
          </Link>
        </NextLink>
        <NextLink href="/register" passHref>
          <Link color="white" fontWeight="bold">
            Register
          </Link>
        </NextLink>
      </Fragment>
    );
  } else {
    body = (
      <Flex>
        <NextLink href="/create-post" passHref>
          <Link color="white" fontWeight="bold" mr={4}>
            Create Post
          </Link>
        </NextLink>
        <Box color="white" mr={4} fontWeight="bold">
          @{data.me.username}
        </Box>
        <Button
          onClick={async () => {
            await logout();
            await apolloClient.resetStore();
          }}
          isLoading={logoutLoading}
          color="white"
          variant="link"
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex zIndex={1} position="sticky" top={0} bg="#319795" py={4}>
      <Flex flex={1} mx="auto" px={4} align="center" maxW="800px">
        <Box mr="auto">
          <NextLink href="/" passHref>
            <Link color="white" fontWeight="bold">
              Social News
            </Link>
          </NextLink>
        </Box>
        <Box ml="auto">{body}</Box>
      </Flex>
    </Flex>
  );
};
