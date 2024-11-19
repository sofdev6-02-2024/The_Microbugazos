import "@/styles/store/StoreAdminHeader.css";
import { MerchantLogo } from "../atoms/MerchantLogo";
import { StoreFormDto } from "@/schemes/store/StoreFormDto";

interface StoreAdminHeaderProps {
  store: StoreFormDto;
}
export const StoreAdminHeader = ({ store }: StoreAdminHeaderProps) => {
  return (
    <nav className="store-admin-header">
      <div className="store-admin-logo-container">
        <MerchantLogo fill="black" />
        <div className="store-admin-logo-sepaator"></div>
        <img
          className="store-admin-logo"
          src={store?.profileImage}
          alt={`${store?.name} logo`}
        />
      </div>
      <div></div>
    </nav>
  );
};
