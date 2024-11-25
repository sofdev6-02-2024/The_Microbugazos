import axiosInstance from "@/request/AxiosConfig";

export const GetProductsByStore = async (storeId: string, page: number, pageSize: number, queryParams: string) => {
  try {
    const query = `/inventory/Product/store/${storeId}?page=${page + 1}&pageSize=${pageSize}${queryParams}`;
    console.log(query);
    let response = await axiosInstance
      .get(query)
    return response.data;
  } catch (e) {
    return e;
  }
}