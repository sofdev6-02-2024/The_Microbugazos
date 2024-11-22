import { InventoryRow } from "./InventoryRow";
import "@/styles/inventory/inventory-table.css";
import Product from "@/commons/entities/concretes/Product";
import { Pagination } from "@/commons/entities/Pagination";

interface InventoryBodyProps {
  data: Pagination<Product>;
  reloadPage: () => Promise<void>;
}

export const InventoryBody = ({ data, reloadPage }: InventoryBodyProps) => {
  return (
    <tbody className="admin-store-inventory-body">
      {data.items.map((product, index) => (
        <InventoryRow
          key={`${product.id || index + product.name}`}
          product={product}
          reloadPage={reloadPage}
        />
      ))}
    </tbody>
  );
};
