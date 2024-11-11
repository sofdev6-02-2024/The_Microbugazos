"use client";

import { useState } from "react";
import { ShoppingCartButton } from "./shoppingCartButton";
import { ShoppingCartList } from "./shoppingCartList";
import ShoppingCartItem from "@/commons/entities/ShoppingCartItem";

export function ShoppingCart() {
  const test: Array<ShoppingCartItem> = [
    {
      id: "5a88c207-de91-411e-a9c1-6d0560cd8e5d",
      imageUrl: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
      name: "Pepsi",
      quantity: 10,
      price: 9.99,
    },
    {
      id: "2b4e7f80-ae32-4f90-9825-1e2c939f637d",
      imageUrl: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
      name: "Coca-Cola",
      quantity: 5,
      price: 8.99,
    },
    {
      id: "7c6f62ba-b8fc-4f1d-8c9d-73e467bc4b45",
      imageUrl: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
      name: "Sprite",
      quantity: 12,
      price: 7.99,
    },
    {
      id: "4d9f4b30-9a73-4e2d-910f-8f48e85a3f1b",
      imageUrl: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
      name: "Fanta",
      quantity: 7,
      price: 6.99,
    },
    {
      id: "5e8a0e5a-5d2b-4c84-9183-9f5e1b5b8f5f",
      imageUrl: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
      name: "Mountain Dew",
      quantity: 9,
      price: 8.49,
    },
    {
      id: "3c4d3a1a-6c99-4f84-9a56-0d72a7dcd7d6",
      imageUrl: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
      name: "Dr Pepper",
      quantity: 6,
      price: 9.49,
    },
    {
      id: "8a4e6d1c-3f5d-4c9e-813f-3e4a6d5d5b7e",
      imageUrl: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
      name: "7UP",
      quantity: 4,
      price: 6.49,
    },
    {
      id: "6e9c7a3b-bf91-4e4e-a2f9-1b3c6d8e2c7a",
      imageUrl: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
      name: "Gatorade",
      quantity: 15,
      price: 10.99,
    },
    {
      id: "1f2d9e3b-4e5c-4f8a-9f3a-7e5b2c6d4f8e",
      imageUrl: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
      name: "Powerade",
      quantity: 8,
      price: 9.19,
    },
    {
      id: "9f7e3c6a-8f2d-4b1d-9e6f-7a3e5d4c2b8a",
      imageUrl: "https://i.postimg.cc/mD00JvFF/pexels-sverrevegard-173741266-11942004.jpg",
      name: "Lipton Iced Tea",
      quantity: 11,
      price: 7.59,
    }
  ];

  const [cartItems, setCartItems] = useState(test);
  const [open, setOpen] = useState(false);

  const openCart = () => {
    setOpen(!open);
  };

  return (
    <>
      <ShoppingCartButton open={openCart} quantity={cartItems.length} />
      <ShoppingCartList items={cartItems} isOpen={open} />
    </>
  );
}
