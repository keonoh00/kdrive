import axios from "axios";
import Cookies from "js-cookie";
import { API_BASE_URL } from "../constants/api";
import { ICreateImageRequest, IUploadImageRequest } from "./types";

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

export const downloadFromUrl = async ({ url }: { url: string | null }) => {
  if (!url) {
    return;
  }
  const response = await axios.get(url, {
    responseType: "blob",
  });
  return response.data;
};

export const deleteFile = async ({ id }: { id: number }) => {
  if (!id) {
    throw new Error("id is required");
  }
  const response = await axiosInstance.delete(`files/${id}`, {
    headers: {
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    },
  });

  return response.data;
};

export const getUploadURL = async () => {
  const response = await axiosInstance.post(`files/generate-upload-url`, null, {
    headers: {
      "X-CSRFToken": Cookies.get("csrftoken") || "",
    },
  });

  return response.data;
};

export const uploadImage = async ({ file, uploadURL }: IUploadImageRequest) => {
  const form = new FormData();
  form.append("file", file[0]);
  const response = await axios.post(uploadURL, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

export const createImage = async ({
  name,
  imageURL,
  imageId,
}: ICreateImageRequest) => {
  const response = await axiosInstance.post(
    `files/upload`,
    { name, image_url: imageURL, image_id: imageId },
    {
      headers: {
        "X-CSRFToken": Cookies.get("csrftoken") || "",
      },
    }
  );

  return response.data;
};
