import React from "react";
import { Box, Flex, Link, Button } from "@chakra-ui/core";
import NextLink from "next/link";
import { useLogoutMutation, useMeQuery } from "../generated/graphql";
import { Fragment } from "react";
import { isServer } from "../utils/is-server";

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
  const [{ fetching: logoutFetching }, logout] = useLogoutMutation();
  const [{ data, fetching }] = useMeQuery({
    pause: isServer(),
  });
  let body = null;

  if (fetching || !data) {
    body = null;
  } else if (!data?.me) {
    body = (
      <Fragment>
        <NextLink href="/login">
          <a>
            <Link color="white" mr={4} fontWeight="bold">
              Login
            </Link>
          </a>
        </NextLink>
        <NextLink href="/register">
          <a>
            <Link color="white" fontWeight="bold">
              Register
            </Link>
          </a>
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
          <a>
            <Link color="white" fontWeight="bold">
              Home
            </Link>
          </a>
        </NextLink>
      </Box>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};
