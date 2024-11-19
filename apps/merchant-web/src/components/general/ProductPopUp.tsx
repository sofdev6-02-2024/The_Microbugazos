"use client";

import { useProductPopUp } from "@/contexts/PopUpContext";
import "@/styles/general/product-pop-up.css";
import { MdClose, MdOpenInNew } from "react-icons/md";
import { useEffect, useRef, useState } from "react";
import ProductVariantPopUp from "@/commons/entities/ProductVariantPopUp";
import { ProductAttributeSelect } from "./ProductAttributeSelect";
import { QuantityPicker } from "@/components/QuantityPicker";
import { AddToCart } from "./AddToCart";
import { useRouter } from "next/navigation";

export const ProductPopUp = () => {
  const {
    showProductPopUp,
    product,
    closeProductPopUp,
    quantity,
    setQuantity,
    increaseQuantity,
    decreaseQuantity,
  } = useProductPopUp();
  const [variants, setVariants] = useState<ProductVariantPopUp[] | null>(null);
  const popUpRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      showProductPopUp &&
      popUpRef.current &&
     !popUpRef.current.contains(event.target as Node)
    ) {
      closeProductPopUp();
    }
  }

  const handleQuantity = (event: { target: { value: string } }) => {
    setQuantity(Number(event.target.value));
  };

  const handleProductPage = () => {
    router.push(`/product/${product?.id}`)
  }

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [])

  useEffect(() => {
    if (product?.productVariants) {
      const attributeMap: Record<string, Set<string>> = {};

      product.productVariants.forEach((variant) => {
        variant.attributes.forEach((attr) => {
          if (!attributeMap[attr.name]) {
            attributeMap[attr.name] = new Set();
          }
          attributeMap[attr.name].add(attr.value);
        });
      });

      const mappedVariants = Object.keys(attributeMap).map((name) => {
        const values = Array.from(attributeMap[name]);
        return new ProductVariantPopUp(name, values);
      });

      setVariants(mappedVariants);
    }
  }, [product]);

  if (!showProductPopUp || !product) {
    return null;
  }

  return (
    <div className={`product-popup ${showProductPopUp ? "show" : ""}`} ref={popUpRef}>
      <button
        onClick={closeProductPopUp}
        className="product-popup-close-button"
      >
        <MdClose />
      </button>
      <div className="product-popup-header">
        <h2 className="product-popup-name">{product?.name} Variants</h2>
        <p className="product-popup-brand">{product.brand}</p>
      </div>
      <div className="product-popup-variants-section">
        {variants && variants.length > 0 ? (
          variants.map((variant, index) => (
            <ProductAttributeSelect
              key={index + variant.name}
              name={variant.name}
              values={variant.values}
            />
          ))
        ) : (
          <p>No variants available</p>
        )}
      </div>
      <div className="product-popup-footer">
        <div className="product-popup-footer-info">
          <p className="total-price">Total: {quantity * product.price} $</p>
          <QuantityPicker
            quantity={quantity}
            changeQuantity={handleQuantity}
            increase={increaseQuantity}
            decrease={decreaseQuantity}
          />
        </div>
        <div className="product-popup-footer-actions">
          <AddToCart product={product} action={() => {
            console.log(product);
          }} />
          <button className="view-product-button" onClick={handleProductPage}>View product<MdOpenInNew /></button>
        </div>
      </div>
    </div>
  );
};
