"use client";

import { useEffect, useRef } from "react";
import { MdClose } from "react-icons/md";
import { useProductPopUp } from "@/contexts/PopUpContext";
import { ProductAttributeSelect } from "./ProductAttributeSelect";
import { ProductPopUpHeader } from "./ProductPopUpHeader";
import { ProductPopUpFooter } from "./ProductPopUpFooter";
import "@/styles/general/product-pop-up.css";

export const ProductPopUp = () => {
  const {
    showProductPopUp,
    product,
    closeProductPopUp,
    getVariants,
    variants,
  } = useProductPopUp();

  const popUpRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      showProductPopUp &&
      popUpRef.current &&
      !popUpRef.current.contains(event.target as Node)
    ) {
      closeProductPopUp();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    getVariants();
  }, [product]);

  if (!showProductPopUp || !product) {
    return null;
  }

  return (
    <div
      className={`product-popup ${showProductPopUp ? "show" : ""}`}
      ref={popUpRef}
    >
      <button
        onClick={closeProductPopUp}
        className="product-popup-close-button"
      >
        <MdClose />
      </button>
      <ProductPopUpHeader name={product.name} brand={product.brand} />
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
      <ProductPopUpFooter />
    </div>
  );
};
