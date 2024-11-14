"use client";
import { NextUIProvider } from "@nextui-org/react";
import { ProductsCarousel } from "@/components/general/ProductsCarousel";
import "./page.css";
import { CoverCarousel } from "@/components/home/CoverCarousel";
import { useEffect, useState } from "react";
import axios from "axios";
import { ProductsCarouselByCategory } from "@/components/home/ProductCarouselCategory";
import Category from "@/commons/entities/concretes/Category";

export default function Home() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [productsRecommendations, setProductsRecommendations] = useState([]);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/inventory/Category"
      );
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProductsRecommendations = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/inventory/Product?page=1&pageSize=10"
      );
      setProductsRecommendations(response.data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProductsRecommendations();
  }, []);

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <NextUIProvider>
      <CoverCarousel />
      <ProductsCarousel
        title="Recommendations"
        products={productsRecommendations}
        url="http://localhost:3000/products"
      />
      {categories.map((category) => (
        <ProductsCarouselByCategory
          key={category.name}
          title={category.name}
          categoryId={category.id}
        />
      ))}
    </NextUIProvider>
  );
}
