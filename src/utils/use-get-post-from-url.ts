import { usePostQuery } from "../generated/graphql";
import { useGetQueryIdInt } from "./use-get-query-id-int";

export const useGetPostFromUrl = () => {
  const queryIdInt = useGetQueryIdInt();
  return usePostQuery({
    skip: queryIdInt === -1,
    variables: {
      id: queryIdInt,
    },
  });
};
