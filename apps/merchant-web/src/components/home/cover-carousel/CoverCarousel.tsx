"use client";

import { useEffect, useState } from "react";
import slides from "@/assets/home/cover-carousel-slides.json";
import { CarouselControls } from "./CarouselControls";
import "@/styles/home/cover-carousel.css";

export const CoverCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    let interval: string | number | NodeJS.Timeout | undefined;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 10000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, slides.length]);

  const handleRight = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  const handleLeft = () => {
    setCurrentSlide(
      (prevSlide) => (prevSlide - 1 + slides.length) % slides.length
    );
  };

  const handlePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  return (
    <div className="cover-carousel">
      <CarouselControls
        handleLeft={handleLeft}
        handleRight={handleRight}
        handlePlayPause={handlePlayPause}
        isPlaying={isPlaying}
      />
      {slides.map((slide, index) => (
        <img
          key={slide.id}
          src={slide.url}
          alt={`Cover carousel slide ${slide.id}`}
          className={`cover-carousel-slide ${
            currentSlide === index ? "show" : ""
          }`}
        />
      ))}
    </div>
  );
};
