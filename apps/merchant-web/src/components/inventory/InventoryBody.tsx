import "@/styles/inventory/inventory-table.css";
import Product from "@/commons/entities/concretes/Product";
import { Pagination } from "@/commons/entities/Pagination";
import { InventoryRow } from "./InventoryRow";
import { useEffect, useState } from "react";

interface InventoryBodyProps {
  data: Pagination<Product>;
  reloadPage: () => Promise<void>;
  deleteProduct: (deleteProduct: () => Promise<void>) => void;
  setCurrentProduct: (product: Product) => void;
  openConfigurationSettings: () => void;
}

export const InventoryBody = ({
  data,
  reloadPage,
  deleteProduct,
  openConfigurationSettings,
  setCurrentProduct,
}: InventoryBodyProps) => {
  const [openDropDown, setOpenDropDown] = useState(-1);

  useEffect(() => {
    setOpenDropDown(-1);
  }, [data]);

  const handleDropDownClick = (index: number) => {
    setOpenDropDown(openDropDown === index ? -1 : index);
  };

  return (
    <tbody className="admin-store-inventory-body">
      {data.items.map((product, index) => (
        <InventoryRow
          key={`${product.id || index + product.name}`}
          product={product}
          reloadPage={reloadPage}
          deleteProduct={deleteProduct}
          setCurrentProduct={setCurrentProduct}
          openConfigurationSettings={openConfigurationSettings}
          active={openDropDown === index}
          onClick={() => handleDropDownClick(index)}
        />
      ))}
    </tbody>
  );
};
