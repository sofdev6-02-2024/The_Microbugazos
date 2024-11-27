import axiosInstance from "./AxiosConfig";

export const validateUserToken = async (token: string) => {
  document.cookie = `auth-token=${token}; path=/`;
  const response = await axiosInstance.get(`/users/Auth/token`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "text/plain",
    },
  });
  return response.data;
};
