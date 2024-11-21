"use client"
import RatingSelector from "@/components/RatingSelector";
import ChipSelector from "@/components/ChipSelector";
import QuantitySelector from "@/components/QuantitySelector";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import {useEffect, useState} from "react";
import ProductDetailsStyle from "@/styles/products/ProductDetails.module.css"
import ImagesSection, {Image} from "@/components/product-details/ImagesSection";
import { useParams } from 'next/navigation'

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
    const params = useParams();
    const id = params?.id as string;
    const [isFavorite, setIsFavorite] = useState(false);
    const [product, setProduct] = useState<Product>({} as Product);
    const [attributesMap, setAttributesMap] = useState<Record<string, Set<string>>>({});
    const [variantSelected, setVariantSelected] = useState<Record<string, number>>({});
    const [images, setImages] = useState<Image[]>([]);
    const [image, setImage] = useState<Image>(null);
    const [variantLoaded, setVariantLoaded] = useState(undefined);
    const [error, setError] = useState<string>(null);

    useEffect(() => {
        console.log(id);
        fetch(`http://localhost:5001/api/inventory/Product/${id}`)
            .then(response => response.json().then(data => {
                const attributeMap: Record<string, Set<string>> = {};
                const variantSelected: Record<string, number> = {};

                setImages(data.data.images);
                setProduct(data.data);

                mapVariants(data.data.productVariants, attributeMap);
                setAttributesMap(attributeMap);
                setVariantSelected(variantSelected);
            }))
            .catch(e => console.error(e));
    }, []);

    const mapVariants = (productVariants, attributeMap) => {
      productVariants.forEach(variant => {
        mapAttributes(variant, attributeMap);
      });
    }

    const mapAttributes = (variant, attributeMap) => {
      variant.attributes.forEach(attribute => {
        if (!attributeMap[attribute.name]) {
          attributeMap[attribute.name] = new Set();
          variantSelected[attribute.name] = -1;
        }
        attributeMap[attribute.name].add(attribute.value);
      });
    }

    const handleVariantSelection = (name : string, index : number) =>  {
        const variantEdited = variantSelected;
        variantEdited[name] = index;
        setVariantSelected(variantEdited);
        const matchVariant = product.productVariants.find(variant =>
            isMatchingVariant(variant, variantEdited, attributesMap)
        );
        setVariantLoaded(matchVariant);
        setImage(matchVariant?.productVariantImage);
    }

    function getValueByIndex(attributeSet, index) {
        return Array.from(attributeSet)[index];
    }

    function isMatchingVariant(variant, desiredAttributes, attributesMap) {
        return Object.entries(desiredAttributes).every(([attribute, index]) => {
            const targetValue = getValueByIndex(attributesMap[attribute], index);
            return variant.attributes.some(attr => attr.name === attribute && attr.value === targetValue);
        });
    }

    function handleAddToCart() {
        const isAllSelected = Object.entries(variantSelected).filter(([_, value]) => value === -1);
        console.log(variantSelected);
        console.log(isAllSelected);

        if (isAllSelected.length === 0) {
            console.log("Success");
            setError(null);
        } else {
            setError("Select all attributes of the product");
        }
    }

    return (
        <div className={ProductDetailsStyle.productDetailsSection}>
            <ImagesSection
                images={images}
                imageSelected={image}
            ></ImagesSection>
            <section style={{
                paddingTop: "12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "start",
                gap: "16px",
                height: "inherit"
            }}>
                <h1 style={{color: "#000", fontFamily: "Montserrat, serif", fontSize: "28px", fontWeight: "bold"}}>{product.name}</h1>
                <RatingSelector rating={2.5}></RatingSelector>
                <label style={{
                    fontSize: "20px",
                    fontWeight: "600",
                }}>$ {product.price}
                    <span style={{
                        fontWeight: "300",
                        fontSize: "16px"
                    }}> ({variantLoaded
                        && (
                            (variantLoaded.priceAdjustment > 0 ? "+$ " : "")
                            + ( variantLoaded.priceAdjustment.toString()))})
                    </span>
                </label>
                {variantLoaded && <label>Total: $ {product.price + variantLoaded.priceAdjustment}</label>}
                <p>
                    {product.description}
                </p>
                <hr/>
                {attributesMap && Object.entries(attributesMap).map(([name, value]) => (
                    <div key={name}>
                        <h4 style={{paddingBottom: "2px"}}>Select {name}</h4>
                        <ChipSelector
                            name={name}
                            options={Array.from(value)}
                            handleChange={handleVariantSelection}
                        />
                    </div>
                ))}
                {error && <label style={{fontSize: "14px", color: "#FB5012"}}><sup>*</sup>{error}</label>}
                <hr/>

                <div
                    style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                        justifyContent: "space-between",
                        alignContent: "center",
                        flexWrap: "wrap",
                        gap: "16px",
                }}>
                    <QuantitySelector></QuantitySelector>
                    <button
                        style={{
                            paddingTop: "14px",
                            paddingBottom: "14px",
                            width: "15vw",
                            minWidth: "144px",
                            border: "none",
                            borderRadius: "24px",
                            backgroundColor: "#7790ED",
                            color: "white",
                            fontSize: "16px"
                        }}
                        onClick={handleAddToCart}
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