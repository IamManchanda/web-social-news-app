import React from "react";
import NextLink from "next/link";
import { Flex, Box, Link, Heading } from "@chakra-ui/core";

interface BackToHomepageProps {}

export const BackToHomepage: React.FC<BackToHomepageProps> = ({}) => {
  return (
    <Flex mb={6}>
      <Box ml="auto">
        <NextLink href="/" passHref>
          <Link color="teal.500" fontWeight="bold">
            <Heading fontSize="xl">Back to Homepage</Heading>
          </Link>
        </NextLink>
      </Box>
    </Flex>
  );
};
