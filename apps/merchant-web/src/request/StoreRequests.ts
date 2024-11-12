import { toast } from "sonner";
import axiosInstance from "./AxiosConfig";
import { StoreFormDto } from "@/schemes/store/StoreFormDto";

const phoneNumberApiKey =
  process.env.NEXT_PUBLIC_PHONE_NUMBER_VALIDATION_API_KEY;
export const getStoreById = async (id: string) => {
  try {
    const response = await axiosInstance.get(`/stores/${id}`);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const createStore = async (data: StoreFormDto) => {
  try {
    const response = await axiosInstance.post("/stores", data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

export const updateStore = async (id: string, data: StoreFormDto) => {
  try {
    const response = await axiosInstance.put(`/stores/${id}`, data);
    return response.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};

const handleAxiosError = (error: any) => {
  console.error("Axios Error:", error.response?.data || error.message);
  let fullMessage = error.response?.data?.detail || error.response.data.message;
  const index = fullMessage.indexOf(":");
  if (index !== -1) {
    fullMessage = fullMessage.substring(index + 2);
  }
  toast.error(`Error: ${fullMessage}`, {
    position: "top-center",
  });
};

export const validatePhoneNumber = async (phoneNumber: string) => {
  try {
    const response = await axiosInstance.get(
      `http://apilayer.net/api/validate?access_key=${phoneNumberApiKey}&number=${phoneNumber}&country_code=&format=1`
    );
    const data = response.data;
    return data.valid;
  }catch (error) {
    toast.error(`Net Error: validating phone number`, {
      position: "top-center",
    })
    throw error;
  }
};
