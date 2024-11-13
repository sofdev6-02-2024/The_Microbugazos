"use client";

import { useState } from "react";
import { ShoppingCartButton } from "./shoppingCartButton";
import { ShoppingCartList } from "./shoppingCartList";

export function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [open, setOpen] = useState(false);

  const openCart = () => {
    setOpen(!open);
  };

  return (
    <>
      <ShoppingCartButton open={openCart} quantity={cartItems.length} />
      <ShoppingCartList items={cartItems} isOpen={open} toggleOpen={openCart} />
    </>
  );
}
