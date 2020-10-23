import { usePostQuery } from "../generated/graphql";
import { useGetQueryIdInt } from "./use-get-query-id-int";

export const useGetPostFromUrl = () => {
  const queryIdInt = useGetQueryIdInt();
  return usePostQuery({
    pause: queryIdInt === -1,
    variables: {
      id: queryIdInt,
    },
  });
};
