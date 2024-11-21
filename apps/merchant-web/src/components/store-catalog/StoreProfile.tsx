"use client"

import React, {useEffect, useState} from "react";
import axiosInstance from "@/request/AxiosConfig";
import {StoreImagesProfile} from "@/components/store/StoreImagesProfile";
import InformationStyle from "@/styles/store-catalog/Information.module.css"

interface Props {
  storeId: string;
}

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
          Store name
        </h1>
        <span className={InformationStyle.contactInformation}>
          Cochabamba, Sacaba (+591 69459340)
        </span>
        <p className={InformationStyle.description}>
          lorem ipsum dolor vae, lorem ipsum dolor vae, lorem ipsum dolor vae, lorem ipsum dolor vae, lorem ipsum dolor vae, lorem ipsum dolor vae, lorem ipsum dolor vae, lorem ipsum dolor vae, lorem ipsum dolor vae, lorem ipsum dolor vae
        </p>
      </div>
    </div>
  );
}