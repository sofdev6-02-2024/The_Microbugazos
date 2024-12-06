import Product from "@/commons/entities/concretes/Product";
import { Pagination } from "@/commons/entities/Pagination";
import { updateLowStockThresholdByProduct } from "@/request/InventorySettingsRequests";
import { updateStore } from "@/request/StoreRequests";
import { StoreFormDto } from "@/schemes/store/StoreFormDto";
import { Dispatch, SetStateAction } from "react";

const applyLowStockConfiguration = async (
  threshold: number,
  setData: Dispatch<SetStateAction<Pagination<Product> | null>>,
  setStore: Dispatch<SetStateAction<StoreFormDto | null>>,
  store: StoreFormDto | null,
  product?: Product
) => {
  if (!product) {
    setStore((prev) => {
      if (!prev) return prev;
      prev.lowStockThreshold = threshold;
      return prev;
    });
    if (!store) return;
    store.lowStockThreshold = threshold;
    await updateStore(store.id ?? "", store);
  } else {
    setData((prev) => {
      if (!prev) return prev;
      prev.items = prev?.items.map((item) => {
        if (item.id === product?.id) {
          product.lowStockThreshold = threshold;
          return product;
        }
        return item;
      });
      return prev;
    });
    await updateLowStockThresholdByProduct(product.id, threshold);
  }
};

export default applyLowStockConfiguration;
