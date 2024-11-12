"use client"
import RatingSelector from "@/components/RatingSelector";
import ChipSelector from "@/components/ChipSelector";
import QuantitySelector from "@/components/QuantitySelector";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import {useEffect, useState} from "react";
import ProductDetailsStyle from "@/styles/products/ProductDetails.module.css"
import ImagesSection, {Image} from "@/components/product-details/ImagesSection";

interface Product {
    productId: string,
    name: string,
    description: string,
    price: number,
    brand: string,
    categories: [],
    images: Image[],
    productVariants: []
}

export default function ProductDetails() {
    const id = "1b8b6e90-b25a-4845-89b4-18c234b234c7";
    const [isFavorite, setIsFavorite] = useState(false);
    const [product, setProduct] = useState([]);
    const [attributesMap, setAttributesMap] = useState<Record<string, Set<string>>>({});
    const [variantSelected, setVariantSelected] = useState<Record<string, number>>({});
    const [images, setImages] = useState<Image[]>([]);

    useEffect(() => {
        fetch(`http://localhost:5001/api/inventory/Product/${id}`)
            .then(response => response.json().then(data => {
                const attributeMap: Record<string, Set<string>> = {};
                const variantSelected: Record<string, number> = {};

                setImages(data.images);
                setProduct(data);

                data.productVariants.forEach(variant => {
                    variant.attributes.forEach(attribute => {
                        if (!attributeMap[attribute.name]) {
                            attributeMap[attribute.name] = new Set();
                            variantSelected[attribute.name] = 0;
                        }
                        attributeMap[attribute.name].add(attribute.value);
                    });
                });
                setAttributesMap(attributeMap);
                setVariantSelected(variantSelected);
            }))
            .catch(e => console.error(e));
    }, []);

    const handleVariantSelection = (name : string, index : number) =>  {
        const variantEdited = variantSelected;
        variantEdited[name] = index;
        console.log(variantEdited);
        setVariantSelected(variantEdited);
    }

    return (
        <div className={ProductDetailsStyle.productDetailsSection}>
            <ImagesSection images={images}></ImagesSection>
            <section style={{
                paddingTop: "12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                gap: "16px",
                height: "inherit"
            }}>
                <h1 style={{color: "#000"}}>{product!.name}</h1>
                <RatingSelector rating={2.5}></RatingSelector>
                <label style={{
                    fontSize: "20px",
                    fontWeight: "600",
                }}>$ {product!.price}</label>
                <p>
                    {product!.description}
                </p>
                <hr/>
                {attributesMap && Object.entries(attributesMap).map(([name, value]) => (
                    <div key={name}>
                        <h4>Select {name}</h4>
                        <ChipSelector
                            name={name}
                            options={Array.from(value)}
                            handleChange={handleVariantSelection}
                        />
                    </div>
                ))}
                <hr/>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        alignContent: "center",
                        flexWrap: "wrap",
                }}>
                    <QuantitySelector></QuantitySelector>
                    <button
                        style={{
                            paddingTop: "14px",
                            paddingBottom: "14px",
                            width: "15vw",
                            minWidth: "144px",
                            borderRadius: "24px",
                            backgroundColor: "#7790ED",
                            color: "white",
                            fontSize: "16px"
                        }}
                    >Add to cart</button>
                    <div>
                        {isFavorite && <MdFavorite
                            color="#FF0000"
                            onClick={() => setIsFavorite(!isFavorite)}
                            size={32}
                        ></MdFavorite>}
                        {!isFavorite && <MdFavoriteBorder
                            color="#FF0000"
                            onClick={() => setIsFavorite(!isFavorite)}
                            size={32}
                        ></MdFavoriteBorder>}
                    </div>
                </div>
            </section>
        </div>
    )
}