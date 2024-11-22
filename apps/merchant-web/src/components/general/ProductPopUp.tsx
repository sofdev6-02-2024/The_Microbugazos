"use client";

import { useEffect } from "react";
import { ProductAttributeSelect } from "./ProductAttributeSelect";
import { QuantityPicker } from "../quantityPicker";
import { AddToCart } from "./AddToCart";
import Product from "@/commons/entities/concretes/Product";
import { useShoppingItem } from "@/commons/hooks/useShoppingItem";
import "@/styles/general/ProductPopUp.css";

interface Props {
  currentProduct: Product;
}

export const ProductPopUp = ({ currentProduct }: Props) => {
  const {
    getVariants,
    product,
    variants,
    quantity,
    price,
    handleQuantity,
    increaseQuantity,
    decreaseQuantity,
  } = useShoppingItem({ currentProduct });

  useEffect(() => {
    getVariants();
  }, [product]);

  return (
    <>
      <div className="product-popup-header">
        <h2 className="product-popup-name">{product?.name} Variants</h2>
        <p className="product-popup-brand">{product?.brand}</p>
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
          <p className="total-price">Total: {price} $</p>
          <QuantityPicker
            quantity={quantity}
            changeQuantity={handleQuantity}
            increase={increaseQuantity}
            decrease={decreaseQuantity}
          />
        </div>
        {product && (
          <div className="product-popup-footer-actions">
            <AddToCart
              product={product}
              action={() => {
                console.log(product);
              }}
            />
          </div>
        )}
      </div>
    </>
  );
};
