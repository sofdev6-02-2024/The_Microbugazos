"use client";

import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { ShoppingCartItemCard } from "./ShoppingCartItemCard";
import "@/styles/shopping-cart-page/shopping-cart-page-list.css";

export const ShoppingCartList = () => {
  const { products } = useShoppingCart();

  return (
    <div className="shopping-items-list-section">
      <div className="shopping-items-list">
        <div className="shopping-items-list-header">
          <h1 className="shopping-items-list-title">Shopping cart</h1>
          <p className="shopping-items-list-quantity">
            Total items: {products.length}
          </p>
        </div>
        <div className="shopping-items-table-header">
          <div className="shopping-items-table-cell"></div>
          <div className="shopping-items-table-cell">Product details</div>
          <div className="shopping-items-table-cell">Quantity</div>
          <div className="shopping-items-table-cell">Price</div>
          <div className="shopping-items-table-cell">Total</div>
          <div className="shopping-items-table-cell"></div>
        </div>
        <div className="shopping-items-list-products-section">
          {products && products.length > 0 ? (
            products.map((item) => {
              return (
                <ShoppingCartItemCard key={`${item.id}-page`} item={item} />
              );
            })
          ) : (
            <div className="shopping-cart-empty">
              Your shopping cart is empty.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
