"use client";
import { StoreDashboard } from "@/components/store/dashboard/StoreDashboard";
import { StoreProfile } from "@/components/store/StoreProfile";
import "@/styles/store/store-dashboard.css";
const StoresPage = () => {
  return (
      <div className="store-dashboard-container">
        <StoreProfile />
        <StoreDashboard />
      </div>
  );
};

export default StoresPage;
