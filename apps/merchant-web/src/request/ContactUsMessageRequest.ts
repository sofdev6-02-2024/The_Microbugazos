import axiosInstance from "./AxiosConfig";
import {handleAxiosError} from "@/request/AxiosErrorHandler";
import {ContactFormData} from "@/schemes/contact-us-form/ContactUsDto";

export const createContactUsMessage = async (data: ContactFormData) => {
  try {
    const response = await axiosInstance.post("/users/ContactUsMessage", data);
    return response.data.data;
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};