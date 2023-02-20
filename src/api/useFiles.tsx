import { QueryFunctionContext, useQuery } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { axisoInstance } from ".";
import { QUERY_KEYS } from "../constants/api";
import { IUser } from "./useUser";

const getDirectoryContents = async ({
  queryKey,
}: QueryFunctionContext): Promise<UseFilesResponse> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, path] = queryKey;

  const response = await axisoInstance.post(
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

interface UseFilesRequest {
  directoryPath: string;
}

interface IFile {
  created_at: string; // JS Date as string
  created_by: IUser;
  id: number;
  name: string;
  path: string;
  updated_at: string; // JS Date as string
  url: string | null;
}

interface UseFilesResponse {
  folders: IFile[];
  images: IFile[];
}

export const useFiles = ({ directoryPath }: UseFilesRequest) => {
  return useQuery(
    [QUERY_KEYS.USER_PROFILE, directoryPath],
    getDirectoryContents,
    { retry: false }
  );
};
