import { auth } from "@/config/firebase";
import { User } from "firebase/auth";
import axiosInstance from "@/request/AxiosConfig";

export const validateTokenWithBackend = async (user: User) => {
  const token = await user.getIdToken();
  if (!token) throw new Error("No token available");

  const response = await axiosInstance.get("/users/Auth/token", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (response.status === 404) {
    await auth.signOut();
    throw new Error("User not registered in the system");
  }

  if (response.status !== 200) {
    await auth.signOut();
    throw new Error("Token validation failed");
  }

  return JSON.stringify(response);
};
