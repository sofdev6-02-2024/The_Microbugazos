"use client";


import React, { useEffect, useState } from "react";
import InformationStyle from "@/styles/store-catalog/Information.module.css";
import axiosInstance from "@/request/AxiosConfig";
import { StoreInfoProfile } from "../store/crud-store/StoreInfoProfile";
import {
  defaultStoreFormData,
  StoreFormDto,
} from "@/schemes/store/StoreFormDto";

export const StoreProfile = ({ storeId }: Props) => {
  const [storeData, setStoreData] = useState<StoreFormDto>();

  useEffect(() => {
    axiosInstance
      .get<StoreFormDto>(`stores/${storeId}`)
      .then((response) => response.data)
      .then((data) => {
        setStoreData(data);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className={InformationStyle.container}>
      <StoreInfoProfile store={storeData ?? defaultStoreFormData} />
    </div>
  );
};

interface Props {
  storeId: string;
}
