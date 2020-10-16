import React from "react";
import { Box, Flex, Link, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Fragment } from "react";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery();
  let body = null;

  if (fetching) {
    body = null;
  } else if (!data?.me) {
    body = (
      <Fragment>
        <NextLink href="/login">
          <Link color="white" mr={4} fontWeight="bold">
            Login
          </Link>
        </NextLink>
        <NextLink href="/register">
          <Link color="white" fontWeight="bold">
            Register
          </Link>
        </NextLink>
      </Fragment>
    );
  } else {
    body = (
      <Flex>
        <Box color="white" mr={4} fontWeight="bold">
          @{data.me.username}
        </Box>
        <Button
          onClick={() => {
            logout();
          }}
          isLoading={logoutFetching}
          color="white"
          variant="link"
        >
          Logout
        </Button>
      </Flex>
    );
  }

  return (
    <Flex bg="#319795" px={8} py={4}>
      <Box mr="auto">
        <NextLink href="/">
          <Link color="white" fontWeight="bold">
            Home
          </Link>
        </NextLink>
      </Box>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};
