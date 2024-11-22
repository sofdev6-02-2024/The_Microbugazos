"use client";
import {useStore} from "@/commons/context/StoreContext";
import {StoreAdminHeader} from "./StoreAdminHeader";
import TwoColumnLayout from "../layouts/TwoColumnLayout";
import {StoreAdminSideMenu} from "./StoreAdminSideMenu";
import "@/styles/store/admin-store.css";
import {defaultStoreFormData} from "@/schemes/store/StoreFormDto";
import Loader from "../Loader";
import {StoreMobileMenu} from "./StoreMobileMenu";
import {useState} from "react";
import {useAuth} from "@/commons/context/AuthContext";
import {UserType} from "@/types/auth";

interface AdminStoreProps {
  children: React.ReactNode;
}

export const AdminStore = ({ children }: AdminStoreProps) => {
  const { store, loading } = useStore();
  const {user} = useAuth();
  const [activeOption, setActiveOption] = useState("/store");

  const handleRouteChange = (route: string) => {
    setActiveOption(route);
  };

  if (loading) {
    return <Loader />;
  }

  const isSellerUser = user?.userType === UserType.SELLER;

  return (
    <>
      <div className="admin-store-container">
        <StoreAdminHeader store={store ?? defaultStoreFormData} />
        <TwoColumnLayout
          leftWidth="15.5%"
          rightWidth="84.5%"
          leftContent={
            <>
              <StoreAdminSideMenu onRouteChange={handleRouteChange} isSellerUser={isSellerUser}/>
              <StoreMobileMenu
                activeOption={activeOption}
                setActiveOption={handleRouteChange}
                isSellerUser={isSellerUser}
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
