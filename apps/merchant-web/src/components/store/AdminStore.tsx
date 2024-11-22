"use client";
import { useStore } from "@/commons/context/StoreContext";
import { StoreAdminHeader } from "./StoreAdminHeader";
import TwoColumnLayout from "../layouts/TwoColumnLayout";
import { StoreAdminSideMenu } from "./StoreAdminSideMenu";
import "@/styles/store/admin-store.css";
import { defaultStoreFormData } from "@/schemes/store/StoreFormDto";
import Loader from "../Loader";
import { StoreMobileMenu } from "./StoreMobileMenu";
import { useState } from "react";

interface AdminStoreProps {
  children: React.ReactNode;
}

export const AdminStore = ({ children }: AdminStoreProps) => {
  const { store, loading } = useStore();
  const [activeOption, setActiveOption] = useState("/store");

  const handleRouteChange = (route: string) => {
    setActiveOption(route);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <div className="admin-store-container">
        <StoreAdminHeader store={store ?? defaultStoreFormData} />
        <TwoColumnLayout
          leftWidth="15.5%"
          rightWidth="84.5%"
          leftContent={
            <>
              <StoreAdminSideMenu onRouteChange={handleRouteChange} />
              <StoreMobileMenu
                activeOption={activeOption}
                setActiveOption={handleRouteChange}
              />
            </>
          }
          rightContent={children}
          className="admin-store-content"
          gap="0"
          type="two-column-mobile"
        />
      </div>
    </>
  );
};
