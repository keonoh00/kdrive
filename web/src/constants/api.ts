export const API_BASE_URL =
  process.env.NODE_ENV === "development"
    ? "http://127.0.0.1:8000/api/v1/"
    : "https://backend.kdrive-ai.com/api/v1/";

export const QUERY_KEYS = {
  USER_PROFILE: "USER_PROFILE",
  DIRECTORY: "DIRECTORY",
};
