import axios from "axios";

export const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_SERVER_SIDE_URL = process.env.NEXT_PUBLIC_API_SERVER_SIDE_URL;

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error as Error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error as Error);
  }
);

export default axiosInstance;
