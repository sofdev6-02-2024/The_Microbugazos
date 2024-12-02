import axiosInstance from "./AxiosConfig";
import { handleAxiosError } from "./AxiosErrorHandler";

export const sendWelcomeEmail = async (email: string, name: string) => {
  try {
    await axiosInstance.post(`/notification/WelcomeEmail`, {
      contact: {
        contactName: name,
        contactEmail: email,
      },
    });
  } catch (error) {
    handleAxiosError(error);
    throw error;
  }
};
