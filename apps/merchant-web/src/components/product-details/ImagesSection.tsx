import ProductDetailsStyle from "@/styles/products/ProductDetails.module.css";
import {useState} from "react";

export interface Image {
    altText: string,
    url: string,
}

interface ImagesSectionProps{
    images: Image[]
    url?: string
}

export default function ImagesSection({ images, url } : ImagesSectionProps) {
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
            {!url && <img className={ProductDetailsStyle.primaryImage} src={images[focusIndex]?.url} alt={images[focusIndex]?.altText}/>}
            {url && <img className={ProductDetailsStyle.primaryImage} src={url} alt=""/>}
        </section>
    )
}