import "@/styles/inventory/inventory-table.css";
import { InventoryTableHeader } from "./InventoryTableHeader";
import { InventoryBody } from "./InventoryBody";
import { useSorting } from "@/commons/hooks/useSorting";
import { SortingProduct } from "@/commons/entities/SortingProduct";
import { useStore } from "@/commons/context/StoreContext";
import {
  getPaginatedProducts,
  getDefaultInventoryProductsUrl,
} from "@/request/StoreAdminRequests";
import { useFetch } from "@/commons/hooks/useFetch";
import { emptyPagination, Pagination } from "@/commons/entities/Pagination";
import Product from "@/commons/entities/concretes/Product";
import { useEffect } from "react";
import Loader from "../Loader";
import { PaginationTable } from "../general/PaginationTable";

export const InventoryTable = () => {
  const { sorting, handleSorting } = useSorting(new SortingProduct());
  const { store } = useStore();
  const { data, loading, error, setData } = useFetch<Pagination<Product>>(
    getDefaultInventoryProductsUrl(store?.id ?? ""),
    emptyPagination
  );
  const handlePagination = async (page: number) => {
    const data = await getPaginatedProducts(page, 10, sorting, store?.id);
    setData(data);
  };

  useEffect(() => {
    if (!data?.page) {
      return;
    }
    handlePagination(data?.page ?? 0);
  }, [sorting, store?.id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error?.message}</p>;
  }
  return (
    <div className="admin-store-inventory-table-ctn">
      <table className="admin-store-inventory-table">
        <InventoryTableHeader
          handleSorting={(a) => {
            handleSorting(a);
          }}
          sorting={sorting}
        />
        <InventoryBody
          data={data ?? emptyPagination}
          reloadPage={() => handlePagination(data?.page ?? 1)}
        />
      </table>
      {data && data?.totalPages > 1 && (
        <PaginationTable pagination={data} onPageChange={handlePagination} />
      )}
    </div>
  );
};
