"use client";

import ShoppingCartItem from "@/commons/entities/ShoppingCartItem";
import "@/styles/header/shoppingCart/shoppingCartItemCard.css";
import { MdDeleteOutline } from "react-icons/md";
import { useShoppingCart } from "@/commons/context/ShoppingCartContext";

interface Props {
  item: ShoppingCartItem;
}

export function ShoppingCartItemCard({ item }: Readonly<Props>) {
  const { deleteProductToCart } = useShoppingCart();

  return (
    <div className="shopping-cart-item-card">
      <img
        src={item.imageUrl}
        alt="Product"
        className="shopping-cart-item-card-image"
      />
      <div className="shopping-cart-item-card-info">
        <h3 className="shopping-cart-item-card-name">{item.name}</h3>
      </div>
      <p className="shopping-cart-item-card-price">{item.price} $</p>
      <button
        className="shopping-cart-item-card-remove"
        onClick={() => deleteProductToCart(item.id)}
      >
        <MdDeleteOutline className="shopping-cart-item-card-remove-icon" />
      </button>
    </div>
  );
}
