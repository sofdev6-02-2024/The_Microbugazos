import axiosInstance from "@/request/AxiosConfig";

export const GetProductsByStore = async (storeId, page, pageSize) => {
  try {
    let response = await axiosInstance.get(`/inventory/Product/byStore/${storeId}?page=${page + 1}&pageSize=${pageSize}`)
    return response.data;
  } catch (e) {
    return e;
  }
}