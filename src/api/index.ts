import axios from "axios";
import { API_BASE_URL } from "../constants/api";

export const axisoInstance = axios.create({
  baseURL: API_BASE_URL,
});
