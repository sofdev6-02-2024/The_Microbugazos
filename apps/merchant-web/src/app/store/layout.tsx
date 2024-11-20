"use client";
import { StoreProvider } from "@/commons/context/StoreContext";
import { AdminStore } from "@/components/store/AdminStore";
const StoresLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <StoreProvider>
      <AdminStore>{children}</AdminStore>
    </StoreProvider>
  );
};

export default StoresLayout;
