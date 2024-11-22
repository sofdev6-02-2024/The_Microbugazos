"use client";

import { useEffect, useState } from "react";
import { ShoppingCartButton } from "./shoppingCartButton";
import { ShoppingCartList } from "./shoppingCartList";
import { useShoppingCart } from "@/commons/context/ShoppingCartContext";

export function ShoppingCart() {
  const { products, initializeShoppingCart } = useShoppingCart();
  const [open, setOpen] = useState(false);

  const openCart = () => {
    setOpen(!open);
  };

  useEffect(() => {
    initializeShoppingCart();
  }, []);

  return (
    <>
      <ShoppingCartButton open={openCart} quantity={products.length} />
      <ShoppingCartList isOpen={open} toggleOpen={openCart} />
    </>
  );
}
