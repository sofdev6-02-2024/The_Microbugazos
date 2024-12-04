"use client";

import "@/styles/inventory/inventory-table.css";
import { useSorting } from "@/commons/hooks/useSorting";
import { SortingProduct } from "@/commons/entities/SortingProduct";
import { useStore } from "@/commons/context/StoreContext";
import { InventoryTableHeader } from "./InventoryTableHeader";
import { InventoryBody } from "./InventoryBody";

import {
  getPaginatedProducts,
  getDefaultInventoryProductsUrl,
} from "@/request/StoreAdminRequests";
import { useFetch } from "@/commons/hooks/useFetch";
import { emptyPagination, Pagination } from "@/commons/entities/Pagination";
import Product from "@/commons/entities/concretes/Product";
import { useEffect, useRef, useState } from "react";
import Loader from "../Loader";
import { PaginationTable } from "../general/PaginationTable";
import { NoProductsFound } from "./NoProductsFound";
import "@/styles/inventory/admin-store-inventory.css";
import { InventoryBar } from "./InventoryBar";

import GeneralModal from "../members-store/GeneralModal";
import { useFiltersContext } from "@/contexts/FiltersContext";
import { useProductsView } from "@/contexts/ProductsViewContext";
import { ConfigureProductOptionsModal } from "./ConfigureProductOptionsModal";
import applyLowStockConfiguration from "@/services/lowStockConfigureService";

export const Inventory = () => {
  const [searchValue, setSearchValue] = useState("");
  const { sorting, handleSorting } = useSorting(new SortingProduct());
  const { store, setStore } = useStore();
  const { data, loading, error, setData } = useFetch<Pagination<Product>>(
    getDefaultInventoryProductsUrl(store?.id ?? ""),
    emptyPagination
  );
  const filtersContext = useFiltersContext();
  const context = useProductsView();
  const productToDeleteAsigned = useRef(false);
  const delteProduct = useRef<() => Promise<void>>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfigureModalOpen, setIsConfigureModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product>();

  const handleSearch = async (value: string) => {
    setSearchValue(value);
    await setProductsData(1, value);
  };

  const handlePagination = async (page: number) => {
    setProductsData(page, searchValue);
  };

  const setProductsData = async (page: number, searchValue: string) => {
    const data = await getPaginatedProducts(
      page,
      20,
      sorting,
      store?.id,
      searchValue,
      filtersContext.getQuery()
    );
    setData(data);
  };

  const openModal = (deleteProduct: () => Promise<void>) => {
    setIsModalOpen(true);
    productToDeleteAsigned.current = true;
    delteProduct.current = deleteProduct;
  };

  const closeModal = () => {
    productToDeleteAsigned.current = false;
    setIsModalOpen(false);
  };

  const handleDelete = async () => {
    let page = data?.page ?? 1;
    if (data?.items.length === 1 && page > 1) {
      page = page - 1;
    }
    handlePagination(page);
  };

  const openConfigureGlobalConfigurationModal = () => {
    setCurrentProduct(undefined);
    setIsConfigureModalOpen(true);
  };

  useEffect(() => {
    if (!data?.page) {
      return;
    }
    handlePagination(data?.page ?? 1);
  }, [sorting, store?.id, context.reloadSignal, filtersContext.isApplied]);

  if (loading) {
    return <Loader />;
  }

  if (error && error?.name !== "CanceledError") {
    return <p>{error?.message}</p>;
  }

  return (
    <div className="admin-store-inventory-ctn">
      <InventoryBar
        handleSearch={handleSearch}
        searchTerm={searchValue}
        setSearchTerm={setSearchValue}
        openConfigureModal={openConfigureGlobalConfigurationModal}
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
              deleteProduct={openModal}
              setCurrentProduct={setCurrentProduct}
              openConfigurationSettings={() => setIsConfigureModalOpen(true)}
            />
          )}
        </table>

        {data && data?.totalPages == 0 && <NoProductsFound />}

        {data && data?.totalPages > 1 && (
          <PaginationTable pagination={data} onPageChange={handlePagination} />
        )}
      </div>

      <GeneralModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onConfirm={async () => {
          if (productToDeleteAsigned.current && delteProduct.current) {
            await delteProduct.current();
          }
          closeModal();
        }}
        type="delete"
        memberName={currentProduct?.name || ""}
        suffix=""
      />

      <ConfigureProductOptionsModal
        isOpen={isConfigureModalOpen}
        onClose={() => {
          {
            setCurrentProduct(undefined);
            setIsConfigureModalOpen(false);
          }
        }}
        onApply={async ({
          product,
          threshold,
        }: {
          product?: Product;
          threshold: number;
        }) => {
          if (!data) {
            return;
          }
          await applyLowStockConfiguration(
            threshold,
            setData,
            setStore,
            store,
            product
          );

          setIsConfigureModalOpen(false);
        }}
        currentProduct={currentProduct}
      />
    </div>
  );
};
