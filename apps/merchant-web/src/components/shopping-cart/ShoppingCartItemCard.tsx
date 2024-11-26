"use client"

import ShoppingCartItem from "@/commons/entities/ShoppingCartItem";
import { QuantityPicker } from "../quantityPicker";
import { useShoppingCart } from "@/commons/context/ShoppingCartContext";
import { MdDeleteOutline } from "react-icons/md";
import "@/styles/shopping-cart-page/shopping-item-card.css";
import { useEffect, useState } from "react";

interface Props {
  item: ShoppingCartItem;
}

export const ShoppingCartItemCard = ({ item }: Props) => {
  const {
    changeQuantity,
    increaseQuantityProduct,
    decreaseQuantityProduct,
    deleteProductToCart,
  } = useShoppingCart();

  const [total, setTotal] = useState(0)

  const handleIncreaseQuantity = () => {
    increaseQuantityProduct(item.id);
  };

  const handleDecreaseQuantity = () => {
    decreaseQuantityProduct(item.id);
  };

  const handleQuantityChange = (event: { target: { value: string } }) => {
    const newQuantity = parseInt(event.target.value);
    changeQuantity(item.id, newQuantity);
  };

  useEffect(() => {
    setTotal(item.quantity * item.price)
  }, [item.quantity, item.price]);

  return (
    <div className="shopping-item-card">
      <img
        src={item.imageUrl}
        alt={item.name}
        className="shopping-item-card-image"
      />
      <div className="shopping-item-card-info-section">
        <h2 className="shopping-item-card-name">{item.name}</h2>
        <div className="shopping-item-card-attribute">
          {item.attributes.map((attribute) => {
            return (
              <p key={`${attribute.name}-${attribute.value}-${item.id}`}>
                {attribute.name}: {attribute.value}
              </p>
            );
          })}
        </div>
      </div>
      <QuantityPicker
        quantity={item.quantity}
        increase={handleIncreaseQuantity}
        decrease={handleDecreaseQuantity}
        changeQuantity={handleQuantityChange}
      />
      <p className="shopping-item-card-price">{item.price.toFixed(2)} $</p>
      <p className="shopping-item-card-total">{total.toFixed(2)} $</p>
      <div className="shopping-item-card-actions-section">
        <button
          className="shopping-item-card-delete"
          onClick={() => deleteProductToCart(item.id)}
        >
          <MdDeleteOutline />
        </button>
      </div>
    </div>
  );
};
