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
import { ShoppingItemProvider } from "@/contexts/ShoppingItemContext";
import "@/styles/general/ProductCard.css";
import defaultImage from "@/app/assets/Images/product-card-image-default.jpg";
import {PostDisLikeProduct, PostLikeProduct} from "@/services/favoritesProductsService";
import useAuth from "@/hooks/useAuth";

interface Props {
  product: Product;
  type: ListType;
  onDislike: (productId: string) => void;
}

export const ProductCard = ({ product, type, onDislike }: Props) => {
  const [isLiked, setIsLiked] = useState(product.isLiked);
  const {user} = useAuth();
  const { open } = useModal();

  const handleProductLike = async () => {
    try {
      if(user?.userId) {
        if (isLiked) {
          await PostDisLikeProduct(user?.userId, product.id);
          onDislike(product.id);
        }
        else
          await PostLikeProduct(user?.userId, product.id);
        setIsLiked(!isLiked);
      }
    } catch (error) {
      console.error("Error handling like/dislike:", error);
    }
  };

  const handleProductClick = () => {
    open(
      <ShoppingItemProvider currentIdProduct={product.id}>
        <ProductPopUp />
      </ShoppingItemProvider>
    );
  };

  return (
    <div className={`product-card ${type}`}>

      <div className={`product-card-image-container ${type}`}>
        <img
          src={product.images.length > 0 ? product.images[0].url : defaultImage.src}
          alt={
            product.images.length > 0 ? product.images[0].altText : "Some image"
          }
          className={`product-card-image ${type}`}
        />
      </div>
      <Link
        href={`/product-details/${product.id}`}
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
        <AddToCart action={handleProductClick} />
        <Like
          productId={product.id}
          isLiked={isLiked}
          toggleLike={handleProductLike}
        />
      </div>
    </div>
  );
};
