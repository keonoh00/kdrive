import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { axiosInstance } from ".";
import { QUERY_KEYS } from "../constants/api";
import { IUser } from "./useUser";

const getDirectoryContents = async ({
  queryKey,
}: QueryFunctionContext): Promise<UseDirectoryItemsResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, path] = queryKey;

  const response = await axiosInstance.post(
    `files/`,
    { path },
    {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    }
  );

  return response.data;
};

interface UseDirectoryItemsRequest {
  directoryPath: string;
}

export interface IFile {
  created_at: string; // JS Date as string
  created_by: IUser;
  id: number;
  name: string;
  path: string;
  updated_at: string; // JS Date as string
  image_url: string | null;
}

interface UseDirectoryItemsResponse {
  folders: IFile[];
  files: IFile[];
}

export const useDirectoryItems = ({
  directoryPath,
}: UseDirectoryItemsRequest) => {
  return useQuery(
    [QUERY_KEYS.USER_PROFILE, directoryPath],
    getDirectoryContents,
    { retry: false }
  );
};
