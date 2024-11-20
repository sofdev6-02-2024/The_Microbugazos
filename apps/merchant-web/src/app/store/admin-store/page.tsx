"use client";
import { useStore } from "@/commons/context/StoreContext";
import { UpdateStore } from "@/components/store/crud-store/UpdateStore";
import {
  parseDtoToScheme,
  defaultStoreFormData,
} from "@/schemes/store/StoreFormDataScheme";
import { Loader } from "lucide-react";
export default function StoresPage() {
  const { store, loading } = useStore();

  if (loading) {
    return <Loader />;
  }

  return (
    <UpdateStore
      storeData={store ? parseDtoToScheme(store) : defaultStoreFormData}
    />
  );
}
