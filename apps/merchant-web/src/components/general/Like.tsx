"use client"

import { MdFavoriteBorder, MdFavorite } from "react-icons/md";
import { UUID } from "crypto"
import '@/styles/general/Like.css'

interface Props {
  productId: UUID;
  isLiked: boolean;
  toggleLike: (id: UUID) => void;
}

export const Like = ({productId, isLiked, toggleLike}: Props) => {
  return (
    <button className="product-like-button" onClick={() => toggleLike(productId)}>
      {
        isLiked? (
          <MdFavorite size={24} color="red" />
        ) : (
          <MdFavoriteBorder size={24} color="red" />
        )
      }
    </button>
  );
}