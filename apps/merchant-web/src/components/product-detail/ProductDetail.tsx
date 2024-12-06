"use client";

import { useEffect, useState } from "react";
import ImagesSection, {
  Image,
} from "@/components/product-details/ImagesSection";
import { Like } from "@/components/general/Like";
import { AddToCart } from "@/components/general/AddToCart";
import { QuantityPicker } from "@/components/quantityPicker";
import { useShoppingItem } from "@/contexts/ShoppingItemContext";
import axiosInstance from "@/request/AxiosConfig";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { AttributeSelector } from "./AttributeSelector";
import styles from "@/styles/products/ProductDetails.module.css";
import ReviewModal from "@/components/reviews/ReviewModal";
import ReviewCard from "@/components/reviews/ReviewCard";
import ReviewsSection from "@/components/product-detail/ReviewsSection";

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
    getDefaultSelectedAttributes
  } = useShoppingItem();

  const { addProductToCart } = useShoppingCart();

  const handleMoreInfo = () => {
    if (product) {
      setImages(product.images);
    }
  };

  const getImage = async () => {
    if (product === undefined) return;

    if (variantId) {
      const response = await axiosInstance(
        `/inventory/ProductVariant/${variantId}`
      );

      if (response.status === 200) {
        setImage(response.data.data.productVariantImage);
      } else {
        setImage(null);
      }
    } else {
      setImage(null);
    }
  };

  const handleAddToCart = () => {
    if (variantId) {
      addProductToCart(createProduct());
      setError(null);
    } else {
      setError("No variant selected");
    }
  };

  const handleLike = () => {
    setIsFavorite(!isFavorite);
  };

  const verifyVariant = () => {
    if (!variantId) {
      setError('The variant is not available')
    } else {
      setError(null);
    }
  }

  useEffect(() => {
    getVariants();
  }, [product]);

  useEffect(() => {
    getImage();
    verifyVariant()
  }, [variantId]);

  useEffect(() => {
    if (product) {
      handleMoreInfo();
    }
  }, [product]);

  useEffect(() => {
    getDefaultSelectedAttributes();
  }, [attributes]);


  if (product === undefined) {
    return <div className="no-product-fount">No found product</div>;
  }

  return (
    <div>
      <div className={styles.productDetailsSection}>
        <ImagesSection images={images} imageSelected={image}></ImagesSection>
        <section className={styles.informationContainer}>
          <h1 className={styles.title}>{product.name}</h1>
          <ReviewModal></ReviewModal>
          <label className={styles.label}>
            $ {product.price}
            <span className={styles.labelLight}>
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
                  <AttributeSelector
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
            <label className={styles.errorLabel}>
              <sup>*</sup>
              {error}
            </label>
          )}
          <hr />

          <div className={styles.actionsContainer}>
            <Like
              isLiked={isFavorite}
              toggleLike={handleLike}
              productId={product.id}
            />
            <AddToCart action={handleAddToCart} />
            <QuantityPicker
              quantity={quantity}
              increase={increaseQuantity}
              decrease={decreaseQuantity}
              changeQuantity={handleQuantity}
            />
          </div>
        </section>
      </div>
      <ReviewsSection/>
    </div>
  );
};
