import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5001/api",
});

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error: Error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error: Error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
