import axiosInstance from "./AxiosConfig";
import { StoreFormDto } from "@/schemes/store/StoreFormDto";
import {handleAxiosError} from "@/request/AxiosErrorHandler";

export const getStoreById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/stores/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
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