"use client";

import { useEffect, useState } from "react";
import RatingSelector from "@/components/RatingSelector";
import ChipSelector from "@/components/ChipSelector";
import ProductDetailsStyle from "@/styles/products/ProductDetails.module.css";
import ImagesSection, {
  Image,
} from "@/components/product-details/ImagesSection";
import { Like } from "@/components/general/Like";
import { AddToCart } from "@/components/general/AddToCart";
import { QuantityPicker } from "@/components/quantityPicker";
import { useShoppingItem } from "@/contexts/ShoppingItemContext";
import axiosInstance from "@/request/AxiosConfig";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";

export const ProductDetail = () => {
  const [isFavorite, setIsFavorite] = useState(false);
  const [images, setImages] = useState<Image[]>([]);
  const [image, setImage] = useState<Image | null>(null);
  const [error, setError] = useState<string | null>(null);
  const {
    quantity,
    increaseQuantity,
    decreaseQuantity,
    handleQuantity,
    product,
    attributes,
    chooseAttribute,
    getVariants,
    priceAdjustment,
    price,
    variantId,
    createProduct,
  } = useShoppingItem();

  const { addProductToCart } = useShoppingCart();

  const handleMoreInfo = () => {
    if (product) {
      setImages(product.images);
    }
  };

  const getImage = async () => {
    if (product === undefined) return

    if (variantId) {
      const response = await axiosInstance(
        `/inventory/ProductVariant/${variantId}`
      );

      if (response.status === 200) {
        setImage(response.data.data.productVariantImage);
      } else {
        setImage(images[0]);
      }
    } else {
      setImage(product.images[0]);
    }
  };

  const handleAddToCart = () => {
    if (variantId) {
      addProductToCart(createProduct());
      setError(null)
    } else {
      setError("No variant selected");
    }
  };

  const handleLike = () => {
    setIsFavorite(!isFavorite);
  };

  useEffect(() => {
    getVariants();
  }, [product]);

  useEffect(() => {
    getImage();
  }, [variantId]);

  useEffect(() => {
    if (product) {
      handleMoreInfo();
    }
  }, [product]);

  if (product === undefined) {
    return <div className="no-product-fount">No found product</div>;
  }

  return (
    <div className={ProductDetailsStyle.productDetailsSection}>
      <ImagesSection images={images} imageSelected={image}></ImagesSection>
      <section className={ProductDetailsStyle.informationContainer}>
        <h1 className={ProductDetailsStyle.title}>{product.name}</h1>
        <RatingSelector rating={2.5}></RatingSelector>
        <label className={ProductDetailsStyle.label}>
          $ {product.price}
          <span className={ProductDetailsStyle.labelLight}>
            {" "}
            ({priceAdjustment > 0 ? `+ ${priceAdjustment} $` : ""})
          </span>
        </label>
        {price > 0 && <label>Total: $ {price}</label>}
        <p>{product.description}</p>
        <hr />
        {attributes && attributes.length > 0 ? (
          attributes.map((attribute) => {
            return (
              <div key={attribute.name} className="variant-option-section">
                <h4>Select {attribute.name}</h4>
                <ChipSelector
                  name={attribute.name}
                  options={attribute.value}
                  handleChange={(value: string) => {
                    chooseAttribute(attribute.name, value);
                  }}
                />
              </div>
            );
          })
        ) : (
          <p>No variants available</p>
        )}
        {error && (
          <label className={ProductDetailsStyle.errorLabel}>
            <sup>*</sup>
            {error}
          </label>
        )}
        <hr />

        <div className={ProductDetailsStyle.actionsContainer}>
          <Like
            isLiked={isFavorite}
            toggleLike={handleLike}
            productId={product.productId}
          />
          {variantId && (
            <>
              <QuantityPicker
                quantity={quantity}
                increase={increaseQuantity}
                decrease={decreaseQuantity}
                changeQuantity={handleQuantity}
              />
              <AddToCart action={handleAddToCart} />
            </>
          )}
        </div>
      </section>
    </div>
  );
};
