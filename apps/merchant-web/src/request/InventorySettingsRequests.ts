import { toast } from "sonner";
import { SortingProduct } from "@/commons/entities/SortingProduct";
import axiosInstance from "./AxiosConfig";
import { SortingType } from "@/commons/entities/SortingType";

export const updateLowStockThresholdByProduct = async (
  productId: string,
  threshold: number
) => {
  if (!productId) {
    return "";
  }

  const updated = await axiosInstance.put(`/inventory/threshold`, {
    productId: productId,
    threshold: threshold,
  });

  if (!updated.data.isSuccess) {
    toast.error(updated.data.message);
  }
  return updated.data.isSuccess;
};
