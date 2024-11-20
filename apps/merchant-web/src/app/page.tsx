"use client";
import { useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ProductsCarousel } from "@/components/general/ProductsCarousel";
import { CoverCarousel } from "@/components/home/cover-carousel/CoverCarousel";
import axiosInstance from "@/request/AxiosConfig";

export default function Home() {
  const [productsRecommendations, setProductsRecommendations] = useState([]);

  const getProductsRecommendations = async () => {
    try {
      const response = await axiosInstance.get(
        "/inventory/Product?page=1&pageSize=10"
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
        url="/products"
      />
    </NextUIProvider>
  );
}
