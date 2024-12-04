import { toast } from "sonner";
import axiosInstance from "./AxiosConfig";

export const updateLowStockThresholdByProduct = async (
  productId: string,
  threshold: number
) => {
  if (!productId) {
    return "";
  }

  const updated = await axiosInstance.put(`/inventory/product/threshold`, {
    productId: productId,
    threshold: threshold,
  });

  if (!updated.data.isSuccess) {
    toast.error(updated.data.message);
  }
  return updated.data.isSuccess;
};
