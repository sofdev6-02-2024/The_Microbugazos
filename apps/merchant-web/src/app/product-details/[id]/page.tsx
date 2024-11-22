"use client"
import RatingSelector from "@/components/RatingSelector";
import ChipSelector from "@/components/ChipSelector";
import QuantitySelector from "@/components/QuantitySelector";
import { MdFavorite, MdFavoriteBorder } from "react-icons/md";
import {useEffect, useState} from "react";
import ProductDetailsStyle from "@/styles/products/ProductDetails.module.css"
import ImagesSection, {Image} from "@/components/product-details/ImagesSection";
import { useParams } from 'next/navigation'
import Product from "@/commons/entities/concretes/Product";

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
            <section className={ProductDetailsStyle.informationContainer}>
                <h1 className={ProductDetailsStyle.title}>{product.name}</h1>
                <RatingSelector rating={2.5}></RatingSelector>
                <label className={ProductDetailsStyle.label}>$ {product.price}
                    <span className={ProductDetailsStyle.labelLight}> ({variantLoaded
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
                {error && <label className={ProductDetailsStyle.errorLabel}><sup>*</sup>{error}</label>}
                <hr/>

                <div className={ProductDetailsStyle.actionsContainer}>
                    <QuantitySelector></QuantitySelector>
                    <button
                        className={ProductDetailsStyle.addToCart}
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