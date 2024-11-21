import axiosInstance from "./AxiosConfig";
import {handleAxiosError} from "@/request/AxiosErrorHandler";

export const getProductVariantById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/inventory/ProductVariant/${id}`);
    return response.data.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};