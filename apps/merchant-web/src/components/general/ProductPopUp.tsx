"use client";

import { useEffect } from "react";
import { ProductAttributeSelect } from "./ProductAttributeSelect";
import { QuantityPicker } from "../quantityPicker";
import { AddToCart } from "./AddToCart";
import { useShoppingItem } from "@/commons/context/ShoppingItemContext";
import "@/styles/general/ProductPopUp.css";

export const ProductPopUp = () => {
  const {
    getVariants,
    product,
    attributes,
    quantity,
    price,
    handleQuantity,
    increaseQuantity,
    decreaseQuantity,
  } = useShoppingItem();

  useEffect(() => {
    getVariants();
  }, [product]);

  useEffect(() => {
    console.log(attributes);
  }, [attributes]);

  return (
    <>
      <div className="product-popup-header">
        <h2 className="product-popup-name">{product?.name} Variants</h2>
        <p className="product-popup-brand">{product?.brand}</p>
      </div>
      <div className="product-popup-variants-section">
        {attributes && attributes.length > 0 ? (
          attributes.map((variant, index) => (
            <ProductAttributeSelect
              key={index + variant.name}
              name={variant.name}
              values={variant.value}
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
