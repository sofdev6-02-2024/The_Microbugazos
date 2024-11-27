"use client";

import ShoppingCartItem from "@/commons/entities/ShoppingCartItem";
import "@/styles/header/shoppingCart/shoppingCartItemCard.css";
import { MdDeleteOutline } from "react-icons/md";
import { useShoppingCart } from "@/contexts/ShoppingCartContext";
import { MouseEvent } from "react";

interface Props {
  item: ShoppingCartItem;
}

export function ShoppingCartItemCard({ item }: Readonly<Props>) {
  const { deleteProductToCart } = useShoppingCart();

  const handleDeleteItem = (event: MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    deleteProductToCart(item.id);
  };

  return (
    <div className="shopping-cart-item-card">
      <img
        src={item.imageUrl}
        alt="Product"
        className="shopping-cart-item-card-image"
      />
      <div className="shopping-cart-item-card-info">
        <h3 className="shopping-cart-item-card-name">{item.name}</h3>
        <p className="shopping-cart-item-card-price">{item.price.toFixed(2)} $</p>
      </div>
      <p className="shopping-cart-item-card-quantity">{item.quantity}</p>
      <button
        className="shopping-cart-item-card-remove"
        onClick={handleDeleteItem}
      >
        <MdDeleteOutline className="shopping-cart-item-card-remove-icon" />
      </button>
    </div>
  );
}
