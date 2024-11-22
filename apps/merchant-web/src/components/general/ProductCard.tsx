"use client";

import { useState } from "react";
import { MdOutlineStar } from "react-icons/md";
import { AddToCart } from "./AddToCart";
import { Like } from "./Like";
import { ListType } from "@/commons/entities/ListType";
import Product from "@/commons/entities/concretes/Product";
import { useProductPopUp } from "@/commons/context/PopUpContext";
import "@/styles/general/ProductCard.css";
import {useRouter} from "next/navigation";

interface Props {
  product: Product;
  type: ListType;
}

export const ProductCard = ({ product, type }: Props) => {
  const [isLiked, setIsLiked] = useState(false);
  const { openProductPopUp } = useProductPopUp();
  const router = useRouter();

  const handleProductClick = () => {
    openProductPopUp(product);
  };

  return (
    <div className={`product-card ${type}`}>
      <img
        src={
          product.images.length > 0
            ? product.images[0].url
            : "https://images.pexels.com/photos/1292294/pexels-photo-1292294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
        alt={
          product.images.length > 0
            ? product.images[0].altText
            : "Some image"
        }
        className={`product-card-image ${type}`}
      />
      <div className={`product-card-info-section ${type}`}>
        <label
          onClick={() => router.push(`/product-details/${product.id}`)}
          className={`product-card-name ${type}`}
        >
          {product.name}
        </label>
        <div className={`product-card-info ${type}`}>
          <p className="product-card-price">
            <span className="product-card-price-symbol">$</span> {product.price}
          </p>
          <p className="product-card-rating">
            <MdOutlineStar />{" "}
            {product.productReviews ? product.productReviews.length : 0}
          </p>
        </div>
        <div className={`product-card-more-actions ${type}`}>
          <AddToCart product={product} action={handleProductClick} />
          <Like
            productId={product.id}
            isLiked={isLiked}
            toggleLike={() => setIsLiked(!isLiked)}
          />
        </div>
      </div>
    </div>
  );
};
