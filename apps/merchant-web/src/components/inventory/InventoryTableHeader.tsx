import "@/styles/inventory/inventory-table-rows.css";
import { SortingProduct } from "@/commons/entities/SortingProduct";
import { SortingIcon } from "../atoms/SortingIcon";

interface InventoryTableHeaderProps {
  sorting: SortingProduct;
  handleSorting: (columnName: keyof SortingProduct) => void;
}
export const InventoryTableHeader = ({
  handleSorting,
  sorting,
}: InventoryTableHeaderProps) => {
  return (
    <thead className="admin-store-inventory-table-header-ctn">
      <tr className="admin-store-inventory-row admin-store-inventory-table-header">
        <th onClick={() => handleSorting("name")}>
          Product Name <SortingIcon sortType={sorting.name} />
        </th>
        <th onClick={() => handleSorting("price")}>
          Price <SortingIcon sortType={sorting.price} />
        </th>
        {/* 
          TOD0 : Uncomment this when rating sorting is implemented
        <th onClick={() => handleSorting("rating")}>
          Rating <SortingIcon sortType={sorting.rating} />
        </th> */}
        <th>
          Rating
        </th>
        <th></th>
      </tr>
    </thead>
  );
};
