"use client";
import { useEffect, useState } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { ProductsCarousel } from "@/components/general/ProductsCarousel";
import { CoverCarousel } from "@/components/home/cover-carousel/CoverCarousel";
import axiosInstance from "@/request/AxiosConfig";
import "./page.css";
import Product from "@/commons/entities/concretes/Product";

export default function Home() {
  const [productsRecommendations, setProductsRecommendations] = useState<
    Array<Product>
  >([]);

  const getProductsRecommendations = async () => {
    try {
      const response = await axiosInstance.get(
        "/inventory/Product?page=1&pageSize=10"
      );
      setProductsRecommendations(
        response.data.data.items.map(
          (product: Product) =>
            new Product(
              product.productId,
              product.storeId,
              product.name,
              product.description,
              product.price,
              product.brand,
              product.images,
              product.productVariants,
              product.categories,
              product.productReviews
            )
        )
      );
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
