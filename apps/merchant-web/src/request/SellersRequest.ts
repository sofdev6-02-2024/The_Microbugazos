import axiosInstance from "@/request/AxiosConfig";
import { UserType } from "@/types/auth";
import { auth } from "@/config/firebase";
import { SellerDto } from "@/schemes/sellers/sellers";

export const getStoreSellersWithOwner = async (storeId: string) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("No authenticated user");
    }
    const token = await currentUser.getIdToken();

    const ownerResponse = await axiosInstance.get('/users/auth/token', {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const owner: SellerDto = {
      ...ownerResponse.data.data,
      userType: UserType.OWNER
    };

    const sellersResponse = await axiosInstance.get(`/stores/${storeId}/sellers`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    const sellers = sellersResponse.data.data as SellerDto[];

    const allSellers = [owner, ...sellers.filter(seller => seller.id !== owner.id)];
    return allSellers;
  } catch (error) {
    console.error("Error fetching store sellers:", error);
    return [];
  }
};

export const deleteStoreSeller = async (storeId: string, sellerId: string) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("No authenticated user");
    }
    const token = await currentUser.getIdToken();

    await axiosInstance.delete(`/stores/${storeId}/sellers/`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      data: JSON.stringify(sellerId)
    });
    return true;
  } catch (error) {
    console.error("Error deleting store seller:", error);
    throw error;
  }
};

export const addStoreSeller = async (storeId: string, sellerEmail: string) => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      throw new Error("No authenticated user");
    }
    const token = await currentUser.getIdToken();

    const response = await axiosInstance.post(
      `/stores/${storeId}/sellers/`,
      JSON.stringify(sellerEmail),
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error: any) {
    const backendMessage = error.response?.data?.message || error.message;
    throw new Error(backendMessage);
  }
};
