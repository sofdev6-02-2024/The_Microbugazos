"use client";
import { InventoryBar } from "./InventoryBar";
import "@/styles/inventory/admin-store-inventory.css";
import { InventoryTable } from "./InventoryTable";

export const Inventory = () => {
  return (
    <div className="admin-store-inventory-ctn">
      <InventoryBar />
      <InventoryTable />
    </div>
  );
};
