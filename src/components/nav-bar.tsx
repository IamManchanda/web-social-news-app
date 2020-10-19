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
    <Flex zIndex={1} position="sticky" top={0} bg="#319795" px={8} py={4}>
      <Box mr="auto">
        <NextLink href="/" passHref>
          <Link color="white" fontWeight="bold">
            Social News
          </Link>
        </NextLink>
      </Box>
      <Box ml="auto">{body}</Box>
    </Flex>
  );
};
