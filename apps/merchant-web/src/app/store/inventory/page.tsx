"use client";

import { FiltersProvider } from "@/contexts/FiltersContext";
import { ProductsViewProvider } from "@/contexts/ProductsViewContext";
import { Inventory } from "@/components/inventory/Inventory";

export default function InventoryPage() {
  return (
    <>
      <ProductsViewProvider>
        <FiltersProvider>
          <Inventory />
        </FiltersProvider>
      </ProductsViewProvider>
    </>
  );
}
