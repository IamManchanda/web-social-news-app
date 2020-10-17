import { withUrqlClient } from "next-urql";
import { Fragment } from "react";
import { NavBar } from "../components/nav-bar";
import { createUrqlClient } from "../utils/create-urql-client";
import { usePostsQuery } from "../generated/graphql";
import { Box } from "@chakra-ui/core";

const Index = () => {
  const [{ data }] = usePostsQuery();

  return (
    <Fragment>
      <NavBar />
      <Box px={8} py={4}>
        <div>Hello World!</div>
        <br />
        {!data ? (
          <div>loading...</div>
        ) : (
          data.posts.map((post) => <div key={post.id}>{post.title}</div>)
        )}
      </Box>
    </Fragment>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
