import { StoreInfoProfile } from "@/components/store/crud-store/StoreInfoProfile";
import { StoreDashboard } from "@/components/store/dashboard/StoreDashboard";

const StoresPage = () => {
  return (
    <div className="padding-standard">
      <StoreInfoProfile />
      <StoreDashboard />
    </div>
  );
};

export default StoresPage;
