"use client"
import * as React from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ProductsCarousel } from "@/components/general/ProductsCarousel";
import "./page.css";
import { CoverCarousel } from "@/components/home/CoverCarousel";

export default function Home() {

  return (
    <NextUIProvider>
      <CoverCarousel />
      <ProductsCarousel
        title="Recommendations"
        products={[]}
        url="http://localhost:3000/products"
      />
      <ProductsCarousel
        title="Refrescos"
        products={[]}
        url="http://localhost:3000/products"
      />
      <ProductsCarousel
        title="Ni idea"
        products={[]}
        url="http://localhost:3000/products"
      />
      <ProductsCarousel
        title="More Test"
        products={[]}
        url="http://localhost:3000/products"
      />
    </NextUIProvider>
  );
}
