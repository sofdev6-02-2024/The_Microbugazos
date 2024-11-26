"use client";

import { useEffect } from "react";
import { ProductAttributeSelect } from "./ProductAttributeSelect";
import { QuantityPicker } from "../quantityPicker";
import { AddToCart } from "./AddToCart";
import { useShoppingItem } from "@/commons/context/ShoppingItemContext";
import "@/styles/general/ProductPopUp.css";
import { useShoppingCart } from "@/commons/context/ShoppingCartContext";

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
    createProduct,
    stock,
    priceAdjustment,
  } = useShoppingItem();

  const { addProductToCart } = useShoppingCart();

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
          <p className="total-price">
            Price: {product?.price} ${" "}
            {priceAdjustment > 0 ? `+${priceAdjustment} $` : ""}
          </p>
          <p className="total-price">Total: {price} $</p>
        </div>
        {product && (
          <div className="product-popup-footer-actions">
            {stock > 0 ? (
              <QuantityPicker
                quantity={quantity}
                changeQuantity={handleQuantity}
                increase={increaseQuantity}
                decrease={decreaseQuantity}
              />
            ) : (
              <p className="no-stock">No stock</p>
            )}
            {stock > 0 && (
              <AddToCart
                action={() => addProductToCart(createProduct())}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
};
