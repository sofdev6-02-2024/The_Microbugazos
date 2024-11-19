"use client";

import ShoppingCartItem from "@/commons/entities/ShoppingCartItem";
import { QuantityPicker } from "@/components/QuantityPicker";
import { useState } from "react";
import "@/styles/header/shoppingCart/shopping-cart-item-card.css";
import { MdDeleteOutline } from "react-icons/md";
import Link from "next/link";

interface Props {
  item: ShoppingCartItem;
}

export function ShoppingCartItemCard({ item }: Readonly<Props>) {
  const [quantity, setQuantity] = useState(0);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
    }
  };

  const handleQuantity = (event: { target: { value: string } }) => {
    setQuantity(Number(event.target.value));
  };

  return (
    <div className="shopping-cart-item-card">
      <img
        src={item.imageUrl}
        alt="Product"
        className="shopping-cart-item-card-image"
      />
      <div className="shopping-cart-item-card-info">
        <Link
          className="shopping-cart-item-card-name"
          href={`/product/${item.id}`}
        >
          {item.name}
        </Link>
        <p className="shopping-cart-item-card-price">{item.price} $</p>
      </div>
      <QuantityPicker
        quantity={quantity}
        increase={increaseQuantity}
        decrease={decreaseQuantity}
        changeQuantity={handleQuantity}
      />
      <button className="shopping-cart-item-card-remove">
        <MdDeleteOutline className="shopping-cart-item-card-remove-icon" />
      </button>
    </div>
  );
}
