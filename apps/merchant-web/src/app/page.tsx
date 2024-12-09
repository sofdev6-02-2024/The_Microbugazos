"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ProductsCarousel } from "@/components/general/ProductsCarousel";
import "./page.css";
import { CoverCarousel } from "@/components/home/CoverCarousel";
import { useEffect, useState } from "react";
import axios from "axios";
import Product from "@/commons/entities/concretes/Product";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const {user} = useAuth();
  const userId = user?.userId;
  const [productsRecommendations, setProductsRecommendations] = useState<
    Array<Product>
  >([]);

  const getProductsRecommendations = async () => {
    try {
      const url = userId
        ? `http://localhost:5001/api/inventory/Product?userId=${userId}&page=1&pageSize=10`
        : `http://localhost:5001/api/inventory/Product?page=1&pageSize=10`;

      const response = await axios.get(url);
      setProductsRecommendations(
        response.data.data.items.map((product: Product) =>
          new Product(
            product.id,
            product.storeId,
            product.name,
            product.description,
            product.price,
            product.brand,
            product.isLiked,
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
    if (userId !== undefined) {
      getProductsRecommendations();
    }
  }, [userId]);

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
