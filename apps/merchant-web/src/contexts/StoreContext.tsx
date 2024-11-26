import { createContext, ReactNode, useContext } from "react";
import { StoreFormDto, defaultStoreFormData } from "@/schemes/store/StoreFormDto";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "./AuthContext";
import { UserType } from "@/types/auth";
import axiosInstance from "@/request/AxiosConfig";

interface StoreContextType {
  store: StoreFormDto | null;
  loading: boolean;
  error: Error | null;
  setStore: (store: StoreFormDto) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const { user } = useAuth();

  const getStoreUrl = () => {
    if (!user) return "";

    const endpoint = user.userType === UserType.SELLER
      ? `/stores/seller/${user.userId}`
      : `/stores/user/${user.userId}`;

    return endpoint;
  };

  const {
    data: store,
    loading,
    error,
    setData: setStore,
  } = useFetch<StoreFormDto>(
    getStoreUrl(),
    defaultStoreFormData,
    axiosInstance
  );

  return (
    <StoreContext.Provider value={{ store, loading, error, setStore }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = (): StoreContextType => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error("useStore must be used within a StoreProvider");
  }
  return context;
};