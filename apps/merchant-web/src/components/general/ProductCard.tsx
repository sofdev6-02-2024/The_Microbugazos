"use client";

import { ListType } from "@/commons/entities/ListType";
import { Product } from "@/commons/entities/Product";
import { useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { AddToCart } from "./AddToCart";
import { Like } from "./Like";
import "@/styles/general/ProductCard.css";

interface Props {
  product: Product;
  type: ListType;
}

export const ProductCard = ({ product, type }: Props) => {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className={`product-card ${type}`}>
      <img
        src={product.images[0].url}
        alt={product.images[0].altText}
        className="product-card-image"
      />
      <a href={`http://localhost:3000/product/${product.id}`} className="product-card-name">{product.name}</a>
      <div className="product-card-info">
        <p className="product-card-price">
          <span className="product-card-price-symbol">$</span> {product.price}
        </p>
        <p className="product-card-rating">
          <MdOutlineStar /> {product.rating}
        </p>
      </div>
      <div className="product-card-more-actions">
        <AddToCart
          product={product}
          action={(product: Product) => {
            console.log(product);
          }}
        />
        <Like
          productId={product.id}
          isLiked={isLiked}
          toggleLike={() => setIsLiked(!isLiked)}
        />
      </div>
    </div>
  );
};
