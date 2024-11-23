"use client";

import { useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { AddToCart } from "./AddToCart";
import { Like } from "./Like";
import { ListType } from "@/commons/entities/ListType";
import Product from "@/commons/entities/concretes/Product";
import { useModal } from "@/commons/context/ModalContext";
import { ProductPopUp } from "./ProductPopUp";
import Link from "next/link";
import { ShoppingItemProvider } from "@/commons/context/ShoppingItemContext";
import "@/styles/general/ProductCard.css";

interface Props {
  product: Product;
  type: ListType;
}

export const ProductCard = ({ product, type }: Props) => {
  const [isLiked, setIsLiked] = useState(false);
  const { open } = useModal();

  const handleProductClick = () => {
    open(
      <ShoppingItemProvider currentProduct={product}>
        <ProductPopUp />
      </ShoppingItemProvider>
    );
  };

  return (
    <div className={`product-card ${type}`}>
      <img
        src={product.images[0].url}
        alt={
          product.images.length > 0 ? product.images[0].altText : "Some image"
        }
        className={`product-card-image ${type}`}
      />
      <Link
        href={`/product-details/${product.productId}`}
        className="product-card-name"
      >
        {product.name}
      </Link>
      <div className="product-card-info">
        <p className="product-card-price">
          <span className="product-card-price-symbol">$</span> {product.price}
        </p>
        <p className="product-card-rating">
          <MdOutlineStar /> 0
        </p>
      </div>
      <div className="product-card-more-actions">
        <AddToCart product={product} action={handleProductClick} />
        <Like
          productId={product.productId}
          isLiked={isLiked}
          toggleLike={() => setIsLiked(!isLiked)}
        />
      </div>
    </div>
  );
};
