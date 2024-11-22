import "@/styles/store/store-admin-header.css";
import { MerchantLogo } from "../atoms/MerchantLogo";
import { defaultSmallImage, StoreFormDto } from "@/schemes/store/StoreFormDto";
import { useRouter } from "next/navigation";
interface StoreAdminHeaderProps {
  store: StoreFormDto;
}
export const StoreAdminHeader = ({ store }: StoreAdminHeaderProps) => {
  const router = useRouter();

  return (
    <nav className="store-admin-header">
      <div className="store-admin-logo-container">
        <div onClick={() => router.push("/")} className="store-admin-logo-icon">
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
