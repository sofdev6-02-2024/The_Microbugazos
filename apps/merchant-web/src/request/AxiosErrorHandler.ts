import { toast } from "sonner";

export const handleAxiosError = (error: any) => {
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