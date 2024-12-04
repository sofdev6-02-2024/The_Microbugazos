import "@/styles/inventory/inventory-table.css";
import Product from "@/commons/entities/concretes/Product";
import { Pagination } from "@/commons/entities/Pagination";
import { InventoryRow } from "./InventoryRow";

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
        />
      ))}
    </tbody>
  );
};
