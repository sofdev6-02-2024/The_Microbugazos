"use client";

import { FaRegSadTear } from "react-icons/fa";
import { ShoppingCartItemCard } from "./ShoppingCartItemCard";
import "@/styles/header/shoppingCart/shoppingCartList.css";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";

interface Props {
  isOpen: boolean;
  toggleOpen: () => void;
}

export function ShoppingCartList({ isOpen, toggleOpen }: Readonly<Props>) {
  const route = useRouter();
  const shoppingCartRef = useRef<HTMLDivElement>(null);
  const { products } = useShoppingCart();

  const handleClickOutside = (event: MouseEvent) => {
    if (
      isOpen &&
      shoppingCartRef.current &&
      !shoppingCartRef.current.contains(event.target as Node)
    ) {
      toggleOpen();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [isOpen]);

  const handleGoShoppingCart = () => {
    route.push("/shopping-cart");
    toggleOpen();
  };

  return (
    <div
      className={`shopping-cart-list ${isOpen ? "opened" : ""}`}
      ref={shoppingCartRef}
    >
      <h2 className="shopping-cart-list-heading">Shopping cart</h2>
      <div className="shopping-cart-list-items-section">
        {products && products.length > 0 ? (
          products.map((item) => {
            return <ShoppingCartItemCard key={item.id} item={item} />;
          })
        ) : (
          <div className="shopping-cart-empty">
            <FaRegSadTear className="shopping-cart-empty-icon" />
            <p className="shopping-cart-empty-text">
              Your shopping cart is empty.
            </p>
          </div>
        )}
      </div>
      <div className="shopping-cart-list-more-options">
        <p className="shopping-cart-list-total">
          Total: {products.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)} $
        </p>
        <button
          className="shopping-cart-list-go-button"
          disabled={products && products.length === 0}
          onClick={handleGoShoppingCart}
        >
          Go shopping cart
        </button>
      </div>
    </div>
  );
}
