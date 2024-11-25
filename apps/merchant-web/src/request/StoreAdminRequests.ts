import { toast } from "sonner";
import { SortingProduct } from "@/commons/entities/SortingProduct";
import axiosInstance from "./AxiosConfig";
import { SortingType } from "@/commons/entities/SortingType";

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
  searchValue: string = "",
  filters: string = ""
) => {
  try {
    if (!storeId) {
      return;
    }

    const sortingParam = filterParams(sorting);
    const response = await axiosInstance.get(
      `/inventory/Product/Store/${storeId}?page=${page}&pageSize=${pageSize}${
        searchValue !== "" ? `&search=${searchValue}` : ""
      }${sortingParam}${filters}`
    );
    return await response.data.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

const filterParams = (params: SortingProduct) => {
  let paramsResult = "";

  if (params.name !== SortingType.NONE) {
    paramsResult += `&NameAsc=${
      params.name === SortingType.ASC ? "true" : "false"
    }`;
  }
  if (params.price !== SortingType.NONE) {
    paramsResult += `&PriceAsc=${
      params.price === SortingType.ASC ? "true" : "false"
    }`;
  }
  if (params.rating !== SortingType.NONE) {
    paramsResult += `&RatingAsc=${
      params.rating === SortingType.ASC ? "true" : "false"
    }`;
  }

  return paramsResult;
};

function handleAxiosError(error: any) {
  toast.error(error.message);
}
