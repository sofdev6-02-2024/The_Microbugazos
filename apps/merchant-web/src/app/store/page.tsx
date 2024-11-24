"use client";
import { StoreDashboard } from "@/components/store/dashboard/StoreDashboard";
import { StoreProfile } from "@/components/store/StoreProfile";
const StoresPage = () => {
  return (
      <div className="padding-standard">
        <StoreProfile />
        <StoreDashboard />
      </div>
  );
};

export default StoresPage;
