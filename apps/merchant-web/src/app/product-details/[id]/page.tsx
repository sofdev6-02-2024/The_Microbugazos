"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";
import Product from "@/commons/entities/concretes/Product";
import axiosInstance from "@/request/AxiosConfig";

import { ShoppingItemProvider } from "@/contexts/ShoppingItemContext";
import { ProductDetail } from "@/components/product-detail/ProductDetail";

export default function ProductDetails() {
  const params = useParams();
  const id = params?.id as string;
  const [storeName, setStoreName] = useState<string>("");
  const [product, setProduct] = useState<Product | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getProduct = async () => {
    try {
      const response = await axiosInstance.get(`/inventory/Product/${id}`);
      setProduct(response.data.data);
      const storeResponse = await axiosInstance.get(
        `/Stores/${response.data.data.storeId}`
      );
     setStoreName(storeResponse.data.data.name);
    } catch (error) {
      setError((error as Error).message);
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  if (error) {
    return <p>Error: {error}</p>;
  }

  return product ? (
    <ShoppingItemProvider currentIdProduct={product.id}>
      <ProductDetail storeName={storeName} />
    </ShoppingItemProvider>
  ) : (
    <p>Loading product details...</p>
  );
}
