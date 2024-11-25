"use client";
import { StoreFormDto } from "@/schemes/store/StoreFormDto";
import { StoreImagesProfile } from "./StoreImagesProfile";
import "@/styles/store/store-info-profile.css";

interface Props {
  store: StoreFormDto;
}

export const StoreInfoProfile = ({ store }: Props) => {
  return (
    <div className="store-info-profile-main-container">
      <StoreImagesProfile
        isEditable={false}
        bannerImage={store?.bannerImage}
        profileImage={store?.profileImage}
      />
      <div className="store-info-container">
        <h1>{store?.name}</h1>
        <p className="store-info-address">
          {store?.address ?? "Some address"}. (
          {store?.phoneNumber ?? "+591 1234567"})
        </p>
        <p className="store-info-description">{store?.description}</p>
      </div>
    </div>
  );
};
