import "@/styles/store/store-admin-header.css";
import { MerchantLogo } from "../atoms/MerchantLogo";
import { StoreFormDto } from "@/schemes/store/StoreFormDto";
import { useRouter } from "next/navigation";
const defaultImage =
  "https://firebasestorage.googleapis.com/v0/b/merchant-auth-9c7f2.appspot.com/o/images%2Fstore%2Fdefault-image-icon.png?alt=media&token=3f7f5804-460e-43e2-bb04-ec002268f2ec";
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
          src={store && store.profileImage ? store.profileImage : defaultImage}
          alt={`${store?.name} logo`}
        />
      </div>
      <div></div>
    </nav>
  );
};
