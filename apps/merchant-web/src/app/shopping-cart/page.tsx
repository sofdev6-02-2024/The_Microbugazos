"use client"

import { ShoppingCartInfo } from "@/components/shopping-cart/ShoppingCartInfo";
import { ShoppingCartList } from "@/components/shopping-cart/ShoppingCartList";
import "@/styles/shopping-cart/shopping-cart-page.css"

export default function ShoppingCart() {
  return (
    <div className="shopping-cart-page">
      <ShoppingCartList />
      <ShoppingCartInfo />
    </div>
  )
}