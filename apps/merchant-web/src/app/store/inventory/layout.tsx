"use client";

import { FiltersProvider } from "@/contexts/FiltersContext";
import { ProductsViewProvider } from "@/contexts/ProductsViewContext";

const InventoryLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <ProductsViewProvider>
        <FiltersProvider>{children}</FiltersProvider>
      </ProductsViewProvider>
    </>
  );
};

export default InventoryLayout;
