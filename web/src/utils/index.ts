import { AxiosError } from "axios";

export const getErrorStringFromAxiosError = (error: AxiosError) => {
  if (!error.response || !error.response.data) {
    return "Something went wrong";
  }

  if (typeof error.response.data === "string") {
    return error.response.data;
  }

  if (Array.isArray(error.response.data) && error.response.data.length > 0) {
    return error.response.data[0];
  }

  if (typeof error.response.data === "object") {
    return Object.values(error.response.data).join(" ");
  }

  return "Something went wrong";
};

export const getDisplayDate = (date: string | Date) => {
  return new Date(date).toLocaleDateString();
};
