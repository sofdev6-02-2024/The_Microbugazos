import styles from "@/styles/products/image-section.module.css";
import { useEffect, useState } from "react";

export interface Image {
  altText: string;
  url: string;
}

interface ImagesSectionProps {
  images: Image[];
  imageSelected?: Image | null;
}

export default function ImagesSection({
  images,
  imageSelected,
}: Readonly<ImagesSectionProps>) {
  const [focusIndex, setFocusIndex] = useState(0);
  const [currentImages, setCurrentImages] = useState<Image[]>(images || []);

  useEffect(() => {
    if (imageSelected) {
      const newImages = [imageSelected, ...images];
      setCurrentImages(newImages);
      setFocusIndex(0);
    } else if (images.length > 0) {
      setCurrentImages(images);
      setFocusIndex(0);
    }
  }, [imageSelected, images]);

  useEffect(() => {
    setCurrentImages(images);
  }, []);

  return (
    <section className={styles.imagesSection}>
      <div className={styles.secondaryImages}>
        {currentImages.map(
          (image, index) =>
            focusIndex !== index && (
              <button
                key={`secondary-image-${index + 1}-button`}
                onClick={() => setFocusIndex(index)}
              >
                <img
                  className={styles.secondaryImage}
                  src={image.url}
                  alt={image.altText}
                />
              </button>
            )
        )}
      </div>
      {currentImages[focusIndex] && (
        <img
          className={styles.primaryImage}
          src={currentImages[focusIndex]?.url || ""}
          alt={currentImages[focusIndex]?.altText || "Image not available"}
        />
      )}
    </section>
  );
}
