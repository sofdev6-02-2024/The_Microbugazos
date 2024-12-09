"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ProductsCarousel } from "@/components/general/ProductsCarousel";
import "./page.css";
import { CoverCarousel } from "@/components/home/CoverCarousel";
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "@/commons/entities/concretes/Product";
import { API_URL } from "@/request/AxiosConfig";

export default function Home() {
  const [productsRecommendations, setProductsRecommendations] = useState<
    Array<Product>
  >([]);

  const getProductsRecommendations = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/inventory/Product?page=1&pageSize=10`
      );
      setProductsRecommendations(
        response.data.data.items.map(
          (product: Product) =>
            new Product(
              product.id,
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
        url="http://localhost:3000/products"
      />
    </NextUIProvider>
  );
}
