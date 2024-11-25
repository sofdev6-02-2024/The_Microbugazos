"use client";


import { useStore } from "@/commons/context/StoreContext";
import { StoreInfoProfile } from "./crud-store/StoreInfoProfile";
import { defaultStoreFormData } from "@/schemes/store/StoreFormDto";

export const StoreProfile = () => {
  const { store } = useStore();
  return (
    <>
      <StoreInfoProfile store={store ?? defaultStoreFormData} />
    </>
  );
};
