"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ProductsCarousel } from "@/components/general/ProductsCarousel";
import { CoverCarousel } from "@/components/home/CoverCarousel";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [productsRecommendations, setProductsRecommendations] = useState([]);

  const getProductsRecommendations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/inventory/Product?page=1&pageSize=10"
      );
      setProductsRecommendations(response.data.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductsRecommendations();
  }, []);

  return (
    <NextUIProvider>
      <CoverCarousel />
      <ProductsCarousel
        title="Recommendations"
        products={productsRecommendations}
        url="http://localhost:3000/products"
      />
    </NextUIProvider>
  );
}
