"use client";
import ImageUpload from "@/components/atoms/ImageUpload";
import styles from "@/styles/store/store-profile.module.css";
interface StoreProfileProps {
  bannerImage?: string;
  profileImage?: string;
  onLoadImage?: (file?: File, type?: "banner" | "profile") => void;
  isEditable?: boolean;
  reload?: string;
}

export const StoreImagesProfile: React.FC<StoreProfileProps> = ({
  bannerImage,
  profileImage,
  onLoadImage,
  isEditable = true,
  reload,
}) => {
  return (
    <div className={styles.container}>
      <ImageUpload
        shape="rectangle"
        width="100%"
        height="300px"
        defaultImage={bannerImage !== undefined ? bannerImage : ""}
        onImageUpload={(file: File) => onLoadImage?.(file, "banner")}
        isEditable={isEditable}
        reload={reload}
      />
      <ImageUpload
        shape="circle"
        width="250px"
        height="250px"
        className="movible"
        defaultImage={bannerImage !== undefined ? profileImage : ""}
        onImageUpload={(file: File) => onLoadImage?.(file, "profile")}
        isEditable={isEditable}
        reload={reload}
      />
    </div>
  );
};
