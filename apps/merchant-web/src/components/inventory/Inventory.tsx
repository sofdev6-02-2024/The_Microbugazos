"use client";

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
import { useEffect, useState } from "react";
import Loader from "../Loader";
import { PaginationTable } from "../general/PaginationTable";
import { NoProductsFound } from "./NoProductsFound";
import "@/styles/inventory/admin-store-inventory.css";
import { InventoryBar } from "./InventoryBar";

export const Inventory = () => {
  const [searchValue, setSearchValue] = useState("");
  const { sorting, handleSorting } = useSorting(new SortingProduct());
  const { store } = useStore();
  const { data, loading, error, setData } = useFetch<Pagination<Product>>(
    getDefaultInventoryProductsUrl(store?.id ?? ""),
    emptyPagination
  );

  const handleSearch = async (value: string) => {
    const newData = await getPaginatedProducts(
      1,
      10,
      sorting,
      store?.id,
      value
    );
    setData(newData);
  };

  const handlePagination = async (page: number) => {
    const data = await getPaginatedProducts(
      page,
      10,
      sorting,
      store?.id,
      searchValue
    );
    setData(data);
  };

  const handleDelete = async () => {
    let page = data?.page ?? 1;
    if (data?.items.length === 1 && page > 1) {
      page = page - 1;
    }
     console.log(page)
    handlePagination(page);
  };

  useEffect(() => {
    if (!data?.page) {
      return;
    }
    handlePagination(data?.page ?? 1);
  }, [sorting, store?.id]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>{error?.message}</p>;
  }
  return (
    <div className="admin-store-inventory-ctn">
      <InventoryBar
        handleSearch={handleSearch}
        searchTerm={searchValue}
        setSearchTerm={setSearchValue}
      />
      <div className="admin-store-inventory-table-ctn">
        <table className="admin-store-inventory-table">
          <InventoryTableHeader
            handleSorting={(a) => {
              handleSorting(a);
            }}
            sorting={sorting}
          />
          {data?.items && data?.items.length > 0 && (
            <InventoryBody
              data={data ?? emptyPagination}
              reloadPage={() => handleDelete()}
            />
          )}
        </table>

        {data && data?.totalPages == 0 && <NoProductsFound />}

        {data && data?.totalPages > 1 && (
          <PaginationTable pagination={data} onPageChange={handlePagination} />
        )}
      </div>{" "}
    </div>
  );
};
