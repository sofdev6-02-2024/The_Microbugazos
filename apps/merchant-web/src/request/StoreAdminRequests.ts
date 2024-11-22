import { toast } from "sonner";
import axiosInstance from "./AxiosConfig";
import { SortingProduct } from "@/commons/entities/SortingProduct";

export const getDefaultInventoryProductsUrl = (storeId: string) => {
  if (!storeId) {
    return "";
  }
  return `/inventory/Product/Store/${storeId}?page=1&pageSize=10&name=0&price=0`;
};

export const getPaginatedProducts = async (
  page: number,
  pageSize: number,
  sorting: SortingProduct,
  storeId?: string,
  searchValue: string = ""
) => {
  try {
    if (!storeId) {
      return;
    }
    const response = await axiosInstance.get(
      `/inventory/Product/Store/${storeId}?page=${page}&pageSize=${pageSize}&name=${sorting.name}&price=${sorting.price}&search=${searchValue}`
    );
    return await response.data.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};
function handleAxiosError(error: any) {
  toast.error(error.message);
}
