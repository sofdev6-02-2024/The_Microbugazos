"use client";
import { InventoryBar } from "./InventoryBar";
import "@/styles/inventory/admin-store-inventory.css";

export const Inventory = () => {
  return (
    <div className="admin-store-inventory-ctn">
      <InventoryBar />
    </div>
  );
};
