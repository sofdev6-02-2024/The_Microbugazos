import "@/styles/store/store-admin-header.css";
import { defaultSmallImage, StoreFormDto } from "@/schemes/store/StoreFormDto";
import { MerchantLogo } from "../atoms/MerchantLogo";

interface StoreAdminHeaderProps {
  store: StoreFormDto;
}
export const StoreAdminHeader = ({ store }: StoreAdminHeaderProps) => {


  return (
    <nav className="store-admin-header">
      <div className="store-admin-logo-container">
        <div onClick={() => window.location.href = "/"} className="store-admin-logo-icon">
          <MerchantLogo fill="black" />
        </div>
        <div className="store-admin-logo-sepaator"></div>
        <img
          className="store-admin-logo"
          src={
            store && store.profileImage ? store.profileImage : defaultSmallImage
          }
          alt={`${store?.name} logo`}
        />
      </div>
      <div></div>
    </nav>
  );
};
