"use client";
import { StoreImagesProfile } from "./StoreImagesProfile";
import { useStore } from "@/commons/context/StoreContext";
import "@/styles/store/store-info-profile.css";
export const StoreInfoProfile = () => {
  const { store } = useStore();
  return (
    <div className="store-info-profile-main-container">
      <StoreImagesProfile
        isEditable={false}
        bannerImage={store?.bannerImage}
        profileImage={store?.profileImage}
      />
      <div className="store-info-container">
        <h2>{store?.name}</h2>
        <p>{store?.description}</p>
      </div>
    </div>
  );
};
