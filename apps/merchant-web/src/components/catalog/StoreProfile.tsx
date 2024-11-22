"use client"

import React, {useEffect, useState} from "react";
import axiosInstance from "@/request/AxiosConfig";
import InformationStyle from "@/styles/store-catalog/Information.module.css"
import {StoreImagesProfile} from "@/components/store/crud-store/StoreImagesProfile";

export const StoreProfile = ({storeId}: Props) => {
  const [storeData, setStoreData] = useState<Store>();

  useEffect(() => {
    axiosInstance
      .get<Store>(`stores/${storeId}`)
      .then((response) => response.data)
      .then(data => {
        setStoreData(data);
      })
      .catch(e => console.error(e));
  }, []);

  return(
    <div>
      <StoreImagesProfile
        bannerImage={storeData?.bannerImage}
        profileImage={storeData?.profileImage}
        isEditable={false}
      />
      <div className={InformationStyle.container}>
        <h1 className={InformationStyle.storeName}>
          {storeData?.name ?? "Store Name"}
        </h1>
        <span className={InformationStyle.contactInformation}>
          {storeData?.address ?? "Some address"}. ({storeData?.phoneNumber ?? "+591 1234567"})
        </span>
        <p className={InformationStyle.description}>
          {storeData?.description ?? "Some description"}
        </p>
      </div>
    </div>
  );
}

interface Props {
  storeId: string;
}
