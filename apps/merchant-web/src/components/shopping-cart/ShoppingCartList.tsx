"use client";

import { useShoppingCart } from "@/commons/context/ShoppingCartContext";
import { ShoppingCartItemCard } from "./ShoppingCartItemCard";
import "@/styles/shopping-cart/shopping-cart-list-page.css";

export const ShoppingCartList = () => {
  const { products } = useShoppingCart();

  return (
    <div className="shopping-cart-page-list-section">
      <div className="shopping-cart-page-list-header">
        <h1 className="shopping-cart-page-list-title">Shopping cart</h1>
        <p className="shopping-cart-page-list-quantity">
          Total items: {products.length}
        </p>
      </div>
      <div className="shopping-cart-page-list-products-section">
        {products && products.length > 0 ? (
          products.map((item) => {
            return <ShoppingCartItemCard key={`${item.id}-page`} item={item} />;
          })
        ) : (
          <div className="shopping-cart-empty">
            Your shopping cart is empty.
          </div>
        )}
      </div>
    </div>
  );
};
