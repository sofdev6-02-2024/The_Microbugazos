"use client";
import {
  MdOutlineStar,
  MdOutlineStarBorder,
  MdOutlineStarHalf,
} from "react-icons/md";

interface RatingSelectorProps {
  rating: number;
  setRating: (number) => void;
  handleChange?: () => void;
  showTotalInfo?: boolean;
  totalReviews?: number;
}

export default function RatingSelector({
  rating, handleChange, setRating, showTotalInfo = true, totalReviews
}: Readonly<RatingSelectorProps>) {
  const size = 24;
  const color = "#FFC633";

  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;

  const handleStarClick = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
  };

  return (
    <div style={{ display: "flex", flexDirection: showTotalInfo ? "row" : "column-reverse", alignItems: showTotalInfo ? "left" : "center"}}>
      <div style={{ display: "flex", cursor: "pointer", alignItems: "center" }}>
        {Array.from({ length: 5 }).map((_, index) => {
          if (index < fullStars) {
            return (
              <MdOutlineStar
                key={index + "star"}
                size={size}
                color={color}
                onClick={() => {
                  handleStarClick(index);
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
            fontSize: showTotalInfo ? "" : "24px"
          }}
        >
          {rating}/5
        </label>
        {showTotalInfo && <label style={{
          color: "black",
          marginLeft: "6px",
        }}>({totalReviews ?? 0})</label>}
      </div>
    </div>
  );
}
