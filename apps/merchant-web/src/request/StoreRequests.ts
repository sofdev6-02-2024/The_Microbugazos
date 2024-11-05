import axiosInstance from "./AxiosConfig";
import { StoreFormDto } from "@/schemes/store/StoreFormDto";

export const getStoreById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/stores/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error; // Re-throw if you need the error to be handled elsewhere
  }
};

export const createStore = async (data: StoreFormDto) => {
  try {
    const response = await axiosInstance.post("/stores", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const updateStore = async (id: string, data: StoreFormDto) => {
  try {
    const response = await axiosInstance.put(`/stores/${id}`, data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

// Function to handle axios errors
const handleAxiosError = (error: any) => {
    console.error("Axios Error:", error.response?.data || error.message);
    alert(
      `Error: ${
        error.response?.data?.message || "An unexpected error occurred"
      }`
    );
};
