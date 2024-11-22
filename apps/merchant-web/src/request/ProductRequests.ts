import { AxiosResponse } from "axios";
import axiosInstance from "./AxiosConfig";
import { toast } from "sonner";

export const deleteProductById = async (id: string) => {
  const response: AxiosResponse = await axiosInstance.delete(
    `/inventory/product/${id}`
  );
  const data = response.data;
  if (data.success) {
    toast.success(data.message);
  }
  return data.success;
};
