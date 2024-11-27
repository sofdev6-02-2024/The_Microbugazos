import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
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
