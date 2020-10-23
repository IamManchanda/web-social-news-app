import { useRouter } from "next/router";

export const useGetQueryIdInt = () => {
  const router = useRouter();
  const queryIdInt =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  return queryIdInt;
};
