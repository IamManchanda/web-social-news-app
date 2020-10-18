import { withUrqlClient } from "next-urql";
import { createUrqlClient } from "../utils/create-urql-client";
import { usePostsQuery } from "../generated/graphql";
import { LayoutWrapper } from "../components/layout-wrapper";
import NextLink from "next/link";
import { Link } from "@chakra-ui/core";

const Index = () => {
  const [{ data }] = usePostsQuery({
    variables: {
      limit: 10,
    },
  });

  return (
    <LayoutWrapper>
      <NextLink href="/create-post" passHref>
        <Link color="teal.500" fontWeight="bold">
          Create Post
        </Link>
      </NextLink>
      <br />
      {!data ? (
        <div>loading...</div>
      ) : (
        data.posts.map((post) => <div key={post.id}>{post.title}</div>)
      )}
    </LayoutWrapper>
  );
};

export default withUrqlClient(createUrqlClient, { ssr: true })(Index);
