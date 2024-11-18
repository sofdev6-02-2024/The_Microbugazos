import ProductDetailsStyle from "@/styles/products/ProductDetails.module.css";
import {useState} from "react";

export interface Image {
    altText: string,
    url: string,
}

interface ImagesSectionProps{
    images: Image[],
    imageSelected?: Image | null
}

export default function ImagesSection({ images, imageSelected } : ImagesSectionProps) {
    const [focusIndex, setFocusIndex] = useState(0);

    return (
        <section className={ProductDetailsStyle.imagesSection}>
            <div className={ProductDetailsStyle.secondaryImages}>
                {images.map((image, index) => focusIndex != index && <img
                    className={ProductDetailsStyle.secondaryImage}
                    src={image.url}
                    alt={image.altText}
                    onClick={() => setFocusIndex(index)}
                />)}
            </div>
            <img
                className={ProductDetailsStyle.primaryImage}
                src={imageSelected == null ? images[focusIndex]?.url : imageSelected.url}
                alt={imageSelected == null ? images[focusIndex]?.altText : imageSelected?.altText}
            />
        </section>
    )
}