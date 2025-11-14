import axios from "axios";
import { Env } from "../../config/env";
import { getAccessToken } from "./headerFunctions";

// Create axios instance
const axiosInstance = axios.create({
  baseURL: Env.api.API_BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken()

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Default content type
    if (!config.headers["Content-Type"]) {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { response } = error;

    if (response?.status === 401) {
      localStorage.clear();
      window.location.href = '/';
    }

    return Promise.reject(response || error);
  }
);

export default axiosInstance;
