import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import { axisoInstance } from ".";
import { QUERY_KEYS } from "../constants/api";

const getDirectoryContents = async ({ queryKey }: QueryFunctionContext) => {
  const [_, path] = queryKey;

  const response = await axisoInstance.get(`files/${path}`);
  return response.data;
};

export const useUser = () => {
  const { data, isError, isLoading } = useQuery(
    [QUERY_KEYS.USER_PROFILE],
    getDirectoryContents,
    { retry: false }
  );

  return { user: data, isLoggedIn: !isError, isLoadingUser: isLoading };
};
