"use client"

import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { PriceInfo } from "./shopping-cart-info/PriceInfo";
import { useEffect, useState } from "react";
import "@/styles/shopping-cart-page/shopping-cart-info.css";

export const ShoppingCartInfo = () => {
  const [shipping, setShipping] = useState(0);
  const [price, setPrice] = useState(0);
  const { products, handleStripe } = useShoppingCart();

  useEffect(() => {
    let totalPrice = 0;
    products.forEach((product) => {
      totalPrice += product.price * product.quantity;
    });
    setPrice(totalPrice);

    if (totalPrice > 100) {
      setShipping(5);
    } else {
      setShipping(0);
    }
  }, [products]);

  return (
    <div className="shopping-cart-info-section">
      <div className="shopping-cart-info">
      <h2 className="shopping-cart-info-title">Order Summary</h2>
      <PriceInfo name="Total items" value={`${products.length}`} />
      <hr />
      <PriceInfo name="Subtotal" value={`${price.toFixed(2)} $`} />
      <hr />
      <PriceInfo
        name="Shipping"
        value={shipping > 0 ? `${shipping} $` : "Free"}
      />
      <hr />
      <PriceInfo name="Total" value={`${(shipping + price).toFixed(2)}`} />
      <button
        className="checkout-button"
        onClick={handleStripe}
      >
        Checkout
      </button>
    </div>
    </div>
  );
};
