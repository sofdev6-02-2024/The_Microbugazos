"use client";

import { FaRegSadTear } from "react-icons/fa";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import ShoppingCartItem from "@/commons/entities/ShoppingCartItem";
import { ShoppingCartItemCard } from "./ShoppingCartItemCard";
import "@/styles/header/shoppingCart/shopping-cart-list.css";

interface Props {
  items: Array<ShoppingCartItem>;
  isOpen: boolean;
  toggleOpen: () => void;
}

export function ShoppingCartList({
  items,
  isOpen,
  toggleOpen,
}: Readonly<Props>) {
  const route = useRouter();
  const shoppingCartRef = useRef<HTMLDivElement>(null);

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
  };

  return (
    <div
      className={`shopping-cart-list ${isOpen ? "opened" : ""}`}
      ref={shoppingCartRef}
    >
      <h2 className="shopping-cart-list-heading">Shopping cart</h2>
      <div className="shopping-cart-list-items-section">
        {items && items.length > 0 ? (
          items.map((item) => {
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
          Total: {items.reduce((total, item) => total + item.price, 0)} $
        </p>
        <button
          className="shopping-cart-list-go-button"
          disabled={items && items.length === 0}
          onClick={handleGoShoppingCart}
        >
          Go shopping cart
        </button>
      </div>
    </div>
  );
}
