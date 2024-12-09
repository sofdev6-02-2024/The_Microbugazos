"use client";
import {
  MdOutlineStar,
  MdOutlineStarBorder,
  MdOutlineStarHalf,
} from "react-icons/md";
import {useState} from "react";

interface RatingSelectorProps {
  rating: number;
  setRating: (number) => void;
  handleChange?: () => void;
  showTotalInfo?: boolean;
  totalReviews?: number;
  horizontalAlignment?: boolean;
  isEditable?: boolean;
}

export default function RatingSelector({
  rating, handleChange, setRating, showTotalInfo = true, totalReviews, horizontalAlignment = true, isEditable = true
}: Readonly<RatingSelectorProps>) {
  const size = 24;
  const color = "#FFC633";

  const [hoverRating, setHoverRating] = useState(0);

  const fullStars = Math.floor(hoverRating || rating);
  const hasHalfStar = (hoverRating || rating) % 1 !== 0;

  const handleStarClick = (index) => {
    if (isEditable) {
      const newRating = index + 1;
      setRating(newRating);
    }
  };

  const handleMouseEnter = (index) => {
    if (isEditable) setHoverRating(index + 1);
  };

  const handleMouseLeave = () => {
    setHoverRating(0);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: horizontalAlignment ? "row" : "column-reverse",
        alignItems: horizontalAlignment ? "left" : "center",
      }}
    >
      <div
        style={{
          display: "flex",
          cursor: isEditable ? "pointer" : "",
          alignItems: "center",
        }}
      >
        {Array.from({ length: 5 }).map((_, index) => {
          if (index < fullStars) {
            return (
              <MdOutlineStar
                key={index + "star"}
                size={size}
                color={color}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  handleStarClick(index)
                  if (handleChange) {
                    handleChange();
                  }
                }}
              />
            );
          } else if (index === fullStars && hasHalfStar) {
            return (
              <MdOutlineStarHalf
                key={index + "star"}
                size={size}
                color={color}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  handleStarClick(index)
                  if (handleChange) {
                    handleChange();
                  }
                }}
              />
            );
          } else {
            return (
              <MdOutlineStarBorder
                key={index + "star"}
                size={size}
                color={color}
                onMouseEnter={() => handleMouseEnter(index)}
                onMouseLeave={handleMouseLeave}
                onClick={() => {
                  handleStarClick(index)
                  if (handleChange) {
                    handleChange();
                  }
                }}
              />
            );
          }
        })}
      </div>
      <div>
        <label
          style={{
            color: "black",
            marginLeft: "6px",
            fontSize: horizontalAlignment ? "" : "24px",
          }}
        >
          {rating}/5
        </label>
        {showTotalInfo && (
          <label
            style={{
              color: "black",
              marginLeft: "6px",
            }}
          >
            ({totalReviews ?? 0})
          </label>
        )}
      </div>
    </div>
  );
}
