"use client";
import {
  MdOutlineStar,
  MdOutlineStarBorder,
  MdOutlineStarHalf,
} from "react-icons/md";
import { useState } from "react";

interface RatingSelectorProps {
  rating: number;
  handleChange?: () => void;
}

export default function RatingSelector({
  rating, handleChange
}: Readonly<RatingSelectorProps>) {
  const [currentRating, setCurrentRating] = useState(rating);
  const size = 24;
  const color = "#FFC633";

  const fullStars = Math.floor(currentRating);
  const hasHalfStar = currentRating % 1 !== 0;

  const handleStarClick = (index: number) => {
    const newRating = index + 1;
    setCurrentRating(newRating);
  };

  return (
    <div style={{ display: "flex", cursor: "pointer", alignItems: "center" }}>
      {Array.from({ length: 5 }).map((_, index) => {
        if (index < fullStars) {
          return (
            <MdOutlineStar
              key={index}
              size={size}
              color={color}
              onClick={() => {
                handleStarClick(index);
                handleChange();
              }}
            />
          );
        } else if (index === fullStars && hasHalfStar) {
          return (
            <MdOutlineStarHalf
              key={index}
              size={size}
              color={color}
              onClick={() => {
                handleStarClick(index)
                handleChange();
              }}
            />
          );
        } else {
          return (
            <MdOutlineStarBorder
              key={index}
              size={size}
              color={color}
              onClick={() => {
                handleStarClick(index)
                handleChange();
              }}
            />
          );
        }
      })}
      <label
        style={{
          color: "var(--action-alert)",
          marginLeft: "6px",
        }}
      >
        {currentRating}/5
      </label>
    </div>
  );
}
