import { StoreInfoProfile } from "@/components/store/crud-store/StoreInfoProfile";
import { StoreDashboard } from "@/components/store/dashboard/StoreDashboard";

const StoresPage = () => {
  return (
    <div style={{padding: "0 20px 20px 20px"}}>
      <StoreInfoProfile />
      <StoreDashboard />
    </div>
  );
};

export default StoresPage;
