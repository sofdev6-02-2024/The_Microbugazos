import axiosInstance from "@/request/AxiosConfig";

export const GetFavoriteProductsByUser = async (userId: string, page: number, pageSize: number, queryParams: string) => {
  try {
    const query = `/inventory/WishList/${userId}/user?page=${page + 1}&pageSize=${pageSize}${queryParams}`;
    let response = await axiosInstance
      .get(query)
    return response.data;
  } catch (e) {
    return e;
  }
}

export const PostLikeProduct = async (userId: string, productId: string) => {
  try {
    const query = `/inventory/WishList/${userId}/user/${productId}/product`;
    let response = await axiosInstance
      .post(query)
    return response.data;
  } catch (e) {
    return e;
  }
}

export const PostDisLikeProduct = async (userId: string, productId: string) => {
  try {
    const query = `/inventory/WishList/${userId}/user/${productId}/product`;
    let response = await axiosInstance
      .delete(query)
    return response.data;
  } catch (e) {
    return e;
  }
}