"use client";
import { useStore } from "@/commons/context/StoreContext";
import { StoreAdminHeader } from "./StoreAdminHeader";
import TwoColumnLayout from "../layouts/TwoColumnLayout";
import { StoreAdminSideMenu } from "./StoreAdminSideMenu";
import CreateNewStoreForm from "./crud-store/CreateNewStoreForm";
import "@/styles/store/AdminStore.css";
import useAuth from "@/hooks/useAuth";
import { UserType } from "@/types/user";
import { defaultStoreFormData } from "@/schemes/store/StoreFormDto";
import Loader from "../Loader";
import { StoreMobileMenu } from "./StoreMobileMenu";
import { useState } from "react";

interface AdminStoreProps {
  children: React.ReactNode;
}

export const AdminStore = ({ children }: AdminStoreProps) => {
  const { store, loading } = useStore();
  const [activeOption, setActiveOption] = useState("/stores");
  const { user } = useAuth();

  const handleRouteChange = (route: string) => {
    setActiveOption(route);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      {user?.userType === UserType.ADMIN ? (
        <div className="admin-store-container">
          <StoreAdminHeader store={store ?? defaultStoreFormData} />
          <TwoColumnLayout
            leftWidth="20%"
            rightWidth="80%"
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
          />
        </div>
      ) : (
        <CreateNewStoreForm />
      )}
    </>
  );
};
