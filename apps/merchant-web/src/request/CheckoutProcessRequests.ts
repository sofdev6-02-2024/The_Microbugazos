import axiosInstance from "./AxiosConfig";
import { handleAxiosError } from "@/request/AxiosErrorHandler";
import { CartData } from "@/schemes/shopping-cart/CartDataDto";

export const createProcessPayment = async (data: CartData) => {
  try {
    const { shoppingCartItems, customer } = data;
    const requestBody = {
      ShoppingCartItems: shoppingCartItems,
      Customer: customer,
    };

    const response = await axiosInstance.post(
      "/payment/Stripe/checkout-session/submit-cart",
      requestBody
    );
    return response.data.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};
