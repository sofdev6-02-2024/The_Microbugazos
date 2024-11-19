"use client";
import ImageUpload from "../atoms/ImageUpload";
import styles from "@/styles/store/store-profile.module.css";
interface StoreProfileProps {
  bannerImage?: string;
  profileImage?: string;
  onLoadImage?: (file?: File, type?: "banner" | "profile") => void;
}

export const StoreImagesProfile: React.FC<StoreProfileProps> = ({
  bannerImage,
  profileImage,
  onLoadImage,
}) => {
  return (
    <div className={styles.container}>
      <ImageUpload
        shape="rectangle"
        width="100%"
        height="300px"
        defaultImage={bannerImage !== undefined ? bannerImage : ""}
        onImageUpload={(file: File) => onLoadImage?.(file, "banner")}
      />
      <ImageUpload
        shape="circle"
        width="250px"
        height="250px"
        className="movible"
        top="200px"
        left="84px"
        defaultImage={bannerImage !== undefined ? profileImage : ""}
        onImageUpload={(file: File) => onLoadImage?.(file, "profile")}
      />
    </div>
  );
};
