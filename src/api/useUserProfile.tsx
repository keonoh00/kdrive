import { useQuery } from "@tanstack/react-query";

import { API_BASE_URL, QUERY_KEYS } from "../constants/api";

const getUserProfile = async () => {
  const response = await fetch(`${API_BASE_URL}/users/me`);
  const json = response.json();
  return json;
};

export const useUserProfile = () =>
  useQuery([QUERY_KEYS.USER_PROFILE], getUserProfile);
