import axiosInstance from "@/request/AxiosConfig";

export const GetProductsByStore = async (storeId: string, page: number, pageSize: number, queryParams: string) => {
  try {
    let response = await axiosInstance
      .get(`/inventory/Product/byStore/${storeId}?page=${page + 1}&pageSize=${pageSize}/${queryParams}`)
    return response.data;
  } catch (e) {
    return e;
  }
}