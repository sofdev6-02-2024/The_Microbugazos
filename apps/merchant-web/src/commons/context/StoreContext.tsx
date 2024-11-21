import { createContext, ReactNode, useContext } from "react";
import { StoreFormDto } from "@/schemes/store/StoreFormDto";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "./AuthContext";
import { defaultStoreFormData } from "@/schemes/store/StoreFormDto";

interface StoreContextType {
  store: StoreFormDto | null;
  loading: boolean;
  error: Error | null;
  setStore: (store: StoreFormDto) => void;
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const url: string = "http://localhost:5001/api/stores/user/";

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const { user} = useAuth();

  const {
    data: store,
    loading,
    error,
    setData: setStore,
  } = useFetch<StoreFormDto>(
    user ? url + user.userId : "",
    defaultStoreFormData
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
