"use client";

import { useEffect, useState } from "react";
import {
  MdNavigateNext,
  MdNavigateBefore,
  MdOutlinePause,
  MdOutlinePlayArrow,
} from "react-icons/md";
import "@/styles/home/cover-carousel.css";

export const CoverCarousel = () => {
  const carousel = [
    "https://i.postimg.cc/d19HTx19/Frame-11.png",
    "https://i.postimg.cc/Y97D0Hp9/Frame-12.png",
    "https://i.postimg.cc/0NDH9Q1F/Frame-13.png",
    "https://i.postimg.cc/FH2BtS80/Frame-14.png",
    "https://i.postimg.cc/KcJpGwCG/Frame-15.png",
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % carousel.length);
      }, 10000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, carousel.length]);

  const handleRight = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % carousel.length);
  };

  const handleLeft = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + carousel.length) % carousel.length
    );
  };

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="cover-carousel">
      <div className="cover-carousel-controls">
        <button className="cover-carousel-control" onClick={handleLeft}>
          <MdNavigateBefore />
        </button>
        <button className="cover-carousel-control" onClick={handleRight}>
          <MdNavigateNext />
        </button>
        <button className="cover-carousel-control" onClick={handlePlayPause}>
          {isPlaying ? <MdOutlinePause /> : <MdOutlinePlayArrow />}
        </button>
      </div>
      {carousel.map((image, index) => (
        <img
          key={`${index}cci`}
          src={image}
          alt={`Cover carousel slide ${index + 1}`}
          className={`cover-carousel-slide ${
            currentSlide === index ? "show" : ""
          }`}
        />
      ))}
    </div>
  );
};
